/* 
========================================================================
   CSK FAN CLUB SITE JAVASCRIPT
   Description: Core interactivity logic for the CSK website.
   Features: Theme toggling, search filtering, CSV exporter, quiz, scrollspy.
========================================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    // =================================================================
    // 1. Mobile Menu Toggle
    // =================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Open/Close menu on hamburger click
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        
        // Toggle icon between bars and times
        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when any navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            const icon = menuToggle.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });


    // =================================================================
    // 2. Dark/Light Theme Toggle
    // =================================================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");

    // Check for saved theme preference in local storage
    const savedTheme = localStorage.getItem("csk-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        // Update icon and save state
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("csk-theme", "dark");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            localStorage.setItem("csk-theme", "light");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    });


    // =================================================================
    // 3. Greatest Victories (Expandable Cards)
    // =================================================================
    const expandButtons = document.querySelectorAll(".btn-expand-victory");

    expandButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const victoryCard = e.target.closest(".victory-card");
            const detailsSection = victoryCard.querySelector(".victory-details");
            
            // Toggle expanded/collapsed class
            if (detailsSection.classList.contains("collapsed")) {
                detailsSection.classList.remove("collapsed");
                detailsSection.classList.add("expanded");
                // Update button text and icon
                button.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            } else {
                detailsSection.classList.remove("expanded");
                detailsSection.classList.add("collapsed");
                // Update button text and icon
                button.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        });
    });


    // =================================================================
    // 4. Navbar Scroll Highlight (Scroll Spy)
    // =================================================================
    const sections = document.querySelectorAll("section");

    function scrollSpy() {
        const scrollPosition = window.scrollY + 120; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // Bind scrollspy to window scroll event
    window.addEventListener("scroll", scrollSpy);


    // =================================================================
    // 5. Current Squad Filtering (Search Box + Category Tabs)
    // =================================================================
    const searchInput = document.getElementById("player-search");
    const filterTabs = document.querySelectorAll(".tab-btn");
    const squadCards = document.querySelectorAll(".squad-card");

    let currentCategoryFilter = "all";
    let currentSearchText = "";

    // Function to run filters on squad cards
    function applySquadFilters() {
        squadCards.forEach(card => {
            const playerRoleAttr = card.getAttribute("data-role");
            const playerName = card.querySelector(".squad-name").textContent.toLowerCase();
            const playerRole = card.querySelector(".squad-role").textContent.toLowerCase();
            const playerBio = card.querySelector(".squad-bio").textContent.toLowerCase();
            const playerNationality = card.querySelector(".squad-meta").textContent.toLowerCase();
            
            // 1. Check Category tab filter
            const matchesCategory = (currentCategoryFilter === "all" || playerRoleAttr === currentCategoryFilter);
            
            // 2. Check Search input text filter
            const searchTerms = currentSearchText.toLowerCase();
            const matchesSearch = playerName.includes(searchTerms) || 
                                  playerRole.includes(searchTerms) || 
                                  playerBio.includes(searchTerms) ||
                                  playerNationality.includes(searchTerms);

            // Show card if both condition matches, else hide it
            if (matchesCategory && matchesSearch) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    }

    // Listen for search input changes
    searchInput.addEventListener("input", (e) => {
        currentSearchText = e.target.value;
        applySquadFilters();
    });

    // Listen for category tab clicks
    filterTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            // Remove active class from other tabs, add to clicked one
            filterTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            // Set current filter and run filtering
            currentCategoryFilter = tab.getAttribute("data-filter");
            applySquadFilters();
        });
    });


    // =================================================================
    // 6. CSV Data Export
    // =================================================================
    const exportBtn = document.getElementById("download-squad");

    // Define squad details array in JS for clean model representation
    const squadList = [
        { name: "Ruturaj Gaikwad", role: "Opening Batsman & Captain", nationality: "Indian", stats: "Matches: 66 | Runs: 2,380 | Avg: 41.75" },
        { name: "Ajinkya Rahane", role: "Middle-Order Batsman", nationality: "Indian", stats: "Matches: 185 | Runs: 4,600 | SR: 123.50" },
        { name: "Shivam Dube", role: "Left-Handed Batsman", nationality: "Indian", stats: "Matches: 61 | Runs: 1,510 | SR: 141.20" },
        { name: "MS Dhoni", role: "Wicketkeeper-Batsman", nationality: "Indian", stats: "Matches: 264 | Runs: 5,243 | SR: 137.54" },
        { name: "Devon Conway", role: "Wicketkeeper-Batsman", nationality: "New Zealand", stats: "Matches: 23 | Runs: 924 | Avg: 46.20" },
        { name: "Ravindra Jadeja", role: "Spin-Bowling All-Rounder", nationality: "Indian", stats: "Matches: 240 | Wickets: 160 | SR: 129.80" },
        { name: "Mitchell Santner", role: "Spin-Bowling All-Rounder", nationality: "New Zealand", stats: "Matches: 18 | Wickets: 15 | Econ: 6.90" },
        { name: "Rachin Ravindra", role: "All-Rounder", nationality: "New Zealand", stats: "Matches: 10 | Runs: 222 | SR: 160.80" },
        { name: "Matheesha Pathirana", role: "Fast Bowler", nationality: "Sri Lanka", stats: "Matches: 20 | Wickets: 34 | Econ: 7.80" },
        { name: "Maheesh Theekshana", role: "Spin Bowler", nationality: "Sri Lanka", stats: "Matches: 30 | Wickets: 31 | Econ: 7.60" },
        { name: "Tushar Deshpande", role: "Fast Bowler", nationality: "Indian", stats: "Matches: 35 | Wickets: 42 | SR: 17.50" }
    ];

    exportBtn.addEventListener("click", () => {
        // Build CSV string headers
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Name,Role,Nationality,Statistics\n";

        // Append player rows
        squadList.forEach(player => {
            // Wrap in quotes to avoid breaking on commas in player statistics
            const row = `"${player.name}","${player.role}","${player.nationality}","${player.stats}"`;
            csvContent += row + "\n";
        });

        // Encode and create download link element
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "csk_squad_details_2026.csv");
        
        // Append link to document, trigger click, then remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });


    // =================================================================
    // 7. IPL Quiz Logic
    // =================================================================
    const quizQuestions = [
        {
            question: "How many IPL titles has CSK won as of the end of 2025?",
            options: ["3 Titles", "4 Titles", "5 Titles", "6 Titles"],
            correctIndex: 2,
            explanation: "CSK has won 5 IPL trophies (2010, 2011, 2018, 2021, and 2023), placing them level with Mumbai Indians for the most titles."
        },
        {
            question: "Who is affectionately known as 'Mr. IPL' by Chennai Super Kings fans?",
            options: ["MS Dhoni", "Suresh Raina", "Ravindra Jadeja", "Michael Hussey"],
            correctIndex: 1,
            explanation: "Suresh Raina earned the nickname 'Mr. IPL' for his extreme consistency, fielding skills, and being the first batsman to score 5,000 runs in the IPL."
        },
        {
            question: "What is the official home ground of Chennai Super Kings?",
            options: ["Wankhede Stadium", "Eden Gardens", "M. A. Chidambaram Stadium", "M. Chinnaswamy Stadium"],
            correctIndex: 2,
            explanation: "CSK's home ground is M. A. Chidambaram Stadium, popularly known as 'Chepauk' or 'The Lion's Den,' located in Chennai."
        },
        {
            question: "Who hit a boundary on the final ball of IPL 2023 to secure CSK's 5th title?",
            options: ["Shivam Dube", "MS Dhoni", "Devon Conway", "Ravindra Jadeja"],
            correctIndex: 3,
            explanation: "Ravindra Jadeja played a legendary cameo, hitting a 6 and a 4 off the final two deliveries from Mohit Sharma to win the title for CSK."
        },
        {
            question: "What is the official team tagline of Chennai Super Kings?",
            options: ["Whistle Podu", "Korbo Lorbo Jeetbo Re", "Halla Bol", "Play Bold"],
            correctIndex: 0,
            explanation: "'Whistle Podu' is the official Tamil tagline of CSK, which translates to 'Blow the Whistle!' and serves as the anthem for fans."
        }
    ];

    let currentQuestionIndex = 0;
    let quizScore = 0;

    // DOM Elements for Quiz
    const quizStartScreen = document.getElementById("quiz-start");
    const quizQuestionScreen = document.getElementById("quiz-question");
    const quizResultsScreen = document.getElementById("quiz-results");
    
    const startQuizBtn = document.getElementById("start-quiz-btn");
    const restartQuizBtn = document.getElementById("restart-quiz-btn");
    const nextQuestionBtn = document.getElementById("next-question-btn");
    
    const questionText = document.getElementById("question-text");
    const quizOptionsContainer = document.getElementById("quiz-options");
    const quizQuestionNumber = document.getElementById("quiz-question-number");
    const quizScoreIndicator = document.getElementById("quiz-score-indicator");
    const quizBarFill = document.getElementById("quiz-bar-fill");
    
    const explanationBox = document.getElementById("explanation-box");
    const explanationText = document.getElementById("explanation-text");
    
    const resultSummary = document.getElementById("result-summary");
    const resultFeedback = document.getElementById("result-feedback");
    const resultIcon = document.getElementById("result-icon");

    // Initialize/Start Quiz
    startQuizBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        quizScore = 0;
        quizStartScreen.classList.remove("active");
        quizQuestionScreen.classList.add("active");
        loadQuestion();
    });

    // Load question details dynamically
    function loadQuestion() {
        // Reset option display, explanation, and next button
        quizOptionsContainer.innerHTML = "";
        explanationBox.classList.add("hidden");
        nextQuestionBtn.classList.add("hidden");

        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        // Update header texts and progress bar
        quizQuestionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
        quizScoreIndicator.textContent = `Score: ${quizScore}`;
        const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        quizBarFill.style.width = `${progressPercentage}%`;

        // Render question text
        questionText.textContent = currentQuestion.question;

        // Render option buttons
        currentQuestion.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = option;
            
            // Listen for selection
            btn.addEventListener("click", () => selectOption(index));
            
            quizOptionsContainer.appendChild(btn);
        });
    }

    // Handles option selection
    function selectOption(selectedIdx) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const optionButtons = quizOptionsContainer.querySelectorAll(".option-btn");
        
        // Disable all option buttons from further clicks
        optionButtons.forEach(btn => btn.classList.add("disabled"));

        // Check if selected answer is correct
        if (selectedIdx === currentQuestion.correctIndex) {
            optionButtons[selectedIdx].classList.add("correct");
            quizScore++;
            quizScoreIndicator.textContent = `Score: ${quizScore}`;
        } else {
            optionButtons[selectedIdx].classList.add("wrong");
            // Highlight the correct answer anyway
            optionButtons[currentQuestion.correctIndex].classList.add("correct");
        }

        // Display explanation
        explanationText.textContent = currentQuestion.explanation;
        explanationBox.classList.remove("hidden");

        // Show Next button or Finish button
        nextQuestionBtn.classList.remove("hidden");
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextQuestionBtn.innerHTML = 'Show Results <i class="fas fa-check-double"></i>';
        } else {
            nextQuestionBtn.innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
        }
    }

    // Click handler for next question / finish
    nextQuestionBtn.addEventListener("click", () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            showResults();
        }
    });

    // Display final quiz summary screen
    function showResults() {
        quizQuestionScreen.classList.remove("active");
        quizResultsScreen.classList.add("active");
        
        resultSummary.textContent = `You scored ${quizScore} out of ${quizQuestions.length}`;
        
        // Tailor feedback based on score
        if (quizScore === 5) {
            resultIcon.innerHTML = '<i class="fas fa-crown text-gold"></i>';
            resultFeedback.textContent = "Outstanding! You are a certified CSK Super Fan! Whistle Podu!";
        } else if (quizScore >= 3) {
            resultIcon.innerHTML = '<i class="fas fa-trophy text-gold"></i>';
            resultFeedback.textContent = "Great job! You know the Super Kings very well. Keep blowing the whistle!";
        } else {
            resultIcon.innerHTML = '<i class="fas fa-heart text-silver"></i>';
            resultFeedback.textContent = "Good try, but you can learn more. Review our site records and try again!";
        }
    }

    // Restart Quiz handler
    restartQuizBtn.addEventListener("click", () => {
        quizResultsScreen.classList.remove("active");
        quizStartScreen.classList.add("active");
    });

});
