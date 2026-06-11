# Mini-projet - nAPPing

---

## Contexte

nAPPing est une application web permettant de planifier, lancer et terminer une sieste **quotidienne**.

L'utilisateur doit pouvoir :
- configurer l'horaire de la sieste,
- paramétrer la durée de la sieste,
- choisir si une notification est faite 10 minutes avant sa sieste,
- choisir le type d'alarme de réveil.

L'application gère ensuite le compte à rebours et déclenche l'alarme.

---

## Fonctionnalités attendues

### MVP (Minimum Vluable Product -> fonctionnalités obligatoires)

- **Sélection de durée** : boutons prédéfinis (10, 20, 30 minutes)
- **Lancement de la sieste** : démarrage d'un compte à rebours avec affichage temps restant
- **Alarme de fin** : signal sonore (alarme visuelle optionelle)
- **Arrêt anticipé** : bouton pour interrompre la sieste en cours

### Fonctionnalités optionelles

- **Rappel avant la sieste** : notification avant l'heure programmée pour rappel de sieste (possibilité d'utiliser l'[API Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API))
- **Barre de progression** visuelle
- pouvoir choisir le type d'alarme (différents MP3)
- internationaliser l'application avec [Lingui](https://lingui.dev/)
- stocker en local les durées des siestes et proposer à l'utilisateur un graphique présentant ses évolutions

---

## Détails d'implémentation React

### Compte à rebours

Afin de mettre en place un compte à rebours il vous est possible d'utiliser (une adaptation sera peut être nécessaire) le hook sur-mesure suivant (à mettre dans un fichier `useCountdown.jsx`) :

```jsx
import { useState, useEffect, useRef } from 'react';

export default function useCountdown(totalSeconds, onComplete) {

  /**
   * Etat qui permet de stocker le nombre de secondes restantes
   */
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  /**
   * Référence vers l'interval (permet de le stopper plus tard, par exemple)
   * Permet de ne pas redessiner le composant à chaque re-render
   */
  const intervalRef = useRef(null);

  /**
   * Fonction qui débute le timer
   */
  const start = () => {
    // si interval déjà démarré, on interrompt la fonction "start"
    if (intervalRef.current) {
      return;
    }

    // création d'un nouvel intervalle
    // la fonction "setInterval(<callback, <délais>)" est native et permet de déclencher une fonction "callback" automatiquement
    // en fonction d'un intervalle
    // Ici, la callback de la fonctionn "setInterval" permet de gérer le cas où le time doit s'arrêter
    intervalRef.current = setInterval(() => {

      // on appelle le "setter" de l'état qui correspond au temps restant
      // Remarque : le setter ne prend pas directement la nouvelle valeur mais une fonction de mise à jour
      // plus d'explication ici : https://fr.react.dev/reference/react/useState#setstate
      setSecondsLeft(prev => {
        
        // si il n'y a plus de secondes restantes
        if (prev <= 1) {
          // on stoppe l'interval
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          // on appelle la fonction de fin
          onComplete();
          return 0;
        }

        // dans le cas contraire on diminue de 1 la valeur du timer
        return prev - 1;
      });
    }, 1000);
  };

  /**
   * Fonction qui stoppe le timer
   */
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // userEffect qui se déclenchera au chargement du composant
  useEffect(() => {

    // la fonction renvoyée se déclenchera à la destruction du composant
    return () => clearInterval(intervalRef.current);
  }, []);

  // on renvoie un Json qui contient 3 éléments :
  // - le nombre de secondes restantes
  // - la fonction "start" qui peut être appelée par le composant parent
  // - la fonction "stop" qui peut également être appelée par le composant parent
  return { secondsLeft, start, stop };
}
```

Voici un exemple d'utilisation dans un autre composant :

```js
function App() {
  // 2 paramétres à ce "hook" :
  // - la durée en secondes de ce "count down"
  // - une fonction qui se délenche une fois que le "count down" est terminé
  const { secondsLeft, start, stop } = useCountdown(30, () => {
    alert('Temps écoulé !');
  });

  return (
    <>
      <div>
        <p>Temps restant : {secondsLeft}</p>
        <button onClick={start}>Démarrer</button>
        <button onClick={stop}>Arrêter</button>
      </div>
    </>
  )
}
```

---

### Alarme

Afin de déclencher une alarme il sera possible d'utiliser la classe `Audio` nativement disponible dans les navigateurs.

Par exemple, pour déclencher un MP3 nommé `alarm.mp3` (le chemin est à adapter) :

```js
const audio = new Audio('/alarm.mp3');
audio.play();
```

En React, il est possible de mettre l'objet de la classe `Audio` dans un `useRef` afin d'éviter de le re-créer à chaque [`re-render`](https://dev.to/brettthurs10/prevent-re-renders-with-useref-1fgf).

Voici un exemple de composant intégrant une alerte audio :

```js
function App() {

  /**
   * Référence vers l'objet de la classe "Audio" permettant de jouer un mp3
   */
  const audioRef = useRef(new Audio('/alarm.mp3'));

  // Utilisation du "hook" custom "useCountdown"
  // 2 paramétres à ce "hook" :
  // - la durée en secondes de ce "count down"
  // - une fonction qui se délenche une fois que le "count down" est terminé
  const { secondsLeft, start, stop } = useCountdown(30, () => {
    alert('Temps écoulé !');

    // exemple d'utilisation de la référence vers l'objet de la classe Audio
    audioRef.current.play();
  });

  return (
    <>
      <div>
        <p>Temps restant : {secondsLeft}s</p>
        <button onClick={start}>Démarrer</button>
        <button onClick={stop}>Arrêter</button>
      </div>
    </>
  )
}
```

---

### Fonctionnalités optionnelles

#### Notification navigateur

Le code suivant permet d'utilisation la bien nommée API Notification native à JS pour déclencher une notification.
```js
/**
 * Fonction à utiliser pour demander à l'utilisateur s'il souhaite activer les notifications
 */
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Envoie une notification
 */
function sendNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/icon.png' });
  }
}

// itilisation au moment du rappel
sendNotification('nAPPing', 'Votre sieste commence dans 10 minutes.');
// et à la fin
sendNotification('nAPPing', 'Réveil ! Bonne reprise.');
```

#### Internationalisation de l'application

Une fois que votre application est fonctionnelle il vous sera possible de l'internationaliser en y intégrant une bibliothèque telle que [Lingui](https://lingui.dev/introduction).

---

## Conseils de conception / développement

1. Etablir le diagramme de cas d'utilisation
2. Créer le wireframe
3. Réfléchir aux diférents composants de l'interface React
3. Implémenter l'interface React de l'application
4. ajouter la logique du programme (intégration du compte à rebours, ajout de l'alarme)

---

## Modalités de travail

- Développement en solitaire
- Temps de développement : 4,5 jour
- Présentatton finale : 30 minutes maximum par personne avec revue de code
- Livrables attendus :
  - diagramme de cas d'utilisation de l'application
  - "wireframe" de l'interface utilisateur (Penpot ou Figma)
  - dépôt Git hébergeant le code source de l'application (NextJs non obligatoire, React simple accepté) + la documentation issue de la conception

> [!TIP]
> Pour créer un projet React vous pourrez utiliser les commandes indiquées [ici](https://github.com/ludovic-esperce/devenv-setup/tree/main/react).

