# Pleasurable User Interface

Ontwerp en maak met een team voor een opdrachtgever een interface waar gebruikers blij van worden.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/pleasurable-ui/blob/main/docs/INSTRUCTIONS.md)



## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving

### Dylan

Ik was verantwoordelijk voor de ontwerpen en bouwen van de hoofdpagina, en heb mijzelf bezig gehouden met de data verwerken van de bookmarks naar de popup en de bookmarkspagina. Ook heb ik mijn eigen versie gemaakt van de show cards, en heb ik een animatie gemaakt voor de popup.

Hieronder is de hoofdpagina te zien:

![Screenshot (399)](https://github.com/user-attachments/assets/1da286f4-c562-4fce-b173-d97a50ba0735)

Hieronder is mijn bookmarkanimatie te zien:

https://github.com/user-attachments/assets/f66c6986-fcfd-4dc0-b157-b2ae46a27dc9



## Gebruik

Met deze versie van de website kan je per radiostation per dag de shows bekijken voor die dag, zien welke show er nu speelt en shows bookmarken. Deze bookmarks zijn op de algemene bookmarkspagina te bekijken. Ook is er een popup waarin de eerstvolgende gebookmarkde show te zien is. Deze popup is uiteraard ook te sluiten


## Kenmerken

### Dylan
**Client side scripting**


Ik heb op de radiopagina een client side script geschreven wat, als DOMparser en Fetch worden ondersteund, er op de achtergrond een fetch wordt gedaan en een bookmark post uitvoerd zonder dat er reload wordt. Hier wordt ook een loading en succes state toegevoegd met classnames. Deze classnames triggeren de animaties.

Hieronder is de client side script te zien:
https://github.com/ColindeGroot/pleasurable-ui/blob/c4dad0f484d953b93168dbfae5216541c2b3b177/views/radio.liquid#L210-L262


## Installatie

Om dit project lokaal te installeren en te draaien, volg je de onderstaande stappen:

### Vereisten
- Node.js (versie 14 of hoger)
- npm (Node Package Manager, wordt meestal samen met Node.js geïnstalleerd)
- GitHub Desktop (niet per se nodig, maar werkt fijn)

### Stappen

1. **Clone de repository**
    - Ga naar de repository: https://github.com/ColindeGroot/pleasurable-ui
    - Klik op Code (groene knop) -> Open with GitHub Desktop
    - Klik op Clone
    - Selecteer "For my own purposes"

2. **Open het project in je codeeditor**

3. **Installeer de afhankelijkheden**
   - Gebruik npm om de benodigde pakketten te installeren door het volgende commando in de terminal uit te voeren:
   ```bash
   npm install
   ```

4. **Start de ontwikkelserver**
   - Start de server met het volgende commando:
   ```bash
   npm start
   ```

5. **Open de applicatie in je browser**
   - De server draait nu op `http://localhost:2000`. Open deze URL in je webbrowser om de applicatie te bekijken.

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
