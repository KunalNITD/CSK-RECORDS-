# CSK-RECORDS-
IPL team record and stats 
Walkthrough - CSK IPL Team Website
We have successfully built a clean, responsive, and interactive IPL fan website for Chennai Super Kings (CSK) using only HTML, CSS, and Vanilla JavaScript. The design reflects a high-quality college or club assignment—simple, structured, functional, and devoid of overly complex or professional 3D/glassmorphic effects.

Visual Highlights
Below are the custom-generated assets used in the application.

Generated Team Assets

File Deliverables
The project is structured within the workspace directory:

index.html
 — Holds the structures for all 12 required sections, complete with sticky navigation, sections, quiz structures, and a footer.
style.css
 — Handles layout styling (Flexbox & CSS Grid), transitions (card hover transformations, button scaling), Light/Dark CSS theme variables, and progress bars.
script.js
 — Integrates theme switching, interactive quiz flow, real-time search and role filtering, expandable match details, CSV data downloader, and scroll spy navigation.
Features Verification Summary
1. Theme Toggle
Action: Click the moon/sun button in the sticky navbar.
Result: Correctly toggles the .dark-theme class on the body. Custom CSS variables swap colors (e.g. from light gray to dark gray backgrounds, blue text to yellow, cards dark background). State is saved in localStorage.
2. Player Search and Tab Filtering
Action: Type names or filter buttons (Batters, Bowlers, etc.) in the Current Squad toolbar.
Result: Real-time filter hides non-matching cards instantly. Category tabs combine seamlessly with search queries.
3. CSV Export
Action: Click the "Download Squad CSV" button.
Result: Generates a standard RFC-compliant CSV string containing player names, roles, nationality, and statistics, automatically downloading it as csk_squad_details_2026.csv.
4. Interactive Trivia Quiz
Action: Click "Start Quiz" and answer the five questions.
Result: Dynamic validation displays instant correct/incorrect color indicators (green/red) and text explanations. Progress bar updates. Final score screen provides custom feedback with a restart option.
5. Expandable Match Cards
Action: Click "Read More" on any match card in the Greatest Victories section.
Result: Details container transitions from height 0 to full size with a smooth sliding effect.
6. Scroll Spy
Action: Scroll down the page.
Result: Sticky navbar menu links highlight active classes as the matching sections enter the viewport.
