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

### Hoofdpagina

De gebruiker kan op de hoofdpagina de radiostations zien, naar de socials gaan, doorklikken naar de programmeringspagina van een radiostation en naar de bookmarks

Hieronder is de hoofdpagina te zien:

![Screenshot (399)](https://github.com/user-attachments/assets/1da286f4-c562-4fce-b173-d97a50ba0735)

Hieronder is mijn bookmarkanimatie te zien:

https://github.com/user-attachments/assets/f66c6986-fcfd-4dc0-b157-b2ae46a27dc9

### Bookmarks pagina 

De gebruiker heeft de mogelijkheid om een show te bookmarken via de radioprogramma’s. De gebookmarkte shows worden opgeslagen op de pagina ‘bookmarks’. Op deze pagina krijgt de gebruiker een overzicht van alle opgeslagen shows van verschillende radioprogramma’s. 

- img (bookmarks knop bij show)

- img (bookmarks pagina)

Om onderscheid te maken tussen de radiostations, zijn de shows in verschillende kleuren op basis van het toe behoorde station. 

- Blauw voor ‘Veronica’
- Roze voor ‘Slam!’
- Groen voor ‘100%NL’

- img (verschillende kleuren per show)


## Gebruik

Met deze versie van de website kan je per radiostation per dag de shows bekijken voor die dag, zien welke show er nu speelt en shows bookmarken. Deze bookmarks zijn op de algemene bookmarkspagina te bekijken. Ook is er een popup waarin de eerstvolgende gebookmarkde show te zien is. Deze popup is uiteraard ook te sluiten


## Kenmerken

### Color contrast test

We hebben de website getest op kleurcontrast en kwamen tot de conclusie dat het contrast niet voldoende is. Hierdoor is voor sommige gebruikers de website moeilijk leesbaar, met namen knoppen of en teksten met een kleurrijke achtergrond. 

Hoewel we de huisstijl van de radiostations graag wilden behouden, hebben we gekozen om de gebruikerservaring voorrang te geven. We hebben daarom kleuren geselecteerd die uitstekend scoren op contrast tests en visueel het meest op de oorspronkelijke kleuren lijken. 

- img (originele kleuren)

- img (aangepaste kleuren)

### **Client side scripting**


Op de radiopagina is een client side script geschreven wat, als DOMparser en Fetch worden ondersteund, er op de achtergrond een fetch wordt gedaan en een bookmark post uitvoerd zonder dat er reload wordt. Hier wordt ook een loading en succes state toegevoegd met classnames. Deze classnames triggeren de animaties.

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
