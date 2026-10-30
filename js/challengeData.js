/**
 * EcoQuest - Challenge & Leaderboard Data Architecture (Phase 4)
 * Contains predefined daily challenges, weekly challenges, and benchmark leaderboard profiles
 */

const EcoChallengeData = {
    dailyChallenges: [
        {
            id: "daily-water-01",
            title: "Household Water Audit",
            description: "Identify and practice 3 ways to reduce household tap and shower water consumption today.",
            category: "Water Conservation",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Turn off the tap while brushing your teeth or washing dishes to save up to 8 liters per minute.",
                "Shorten shower time by 2 minutes to conserve roughly 20-30 liters of warm water.",
                "Check household faucets and toilet tanks for silent leaks and report or repair them."
            ]
        },
        {
            id: "daily-plastic-02",
            title: "Zero Single-Use Plastic",
            description: "Avoid single-use plastic bags, straws, and disposable drink cups throughout the day.",
            category: "Waste Management",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Carry a reusable canvas tote bag for all groceries and errands.",
                "Use a stainless steel or refillable water bottle instead of buying single-use bottled water.",
                "Decline plastic straws and disposable cutlery when purchasing meals or beverages."
            ]
        },
        {
            id: "daily-energy-03",
            title: "Phantom Load Audit",
            description: "Identify and eliminate idle standby power draw ('vampire power') across your home appliances.",
            category: "Energy Efficiency",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Unplug laptop chargers, gaming consoles, and kitchen appliances when not actively in use.",
                "Switch off power strips overnight to prevent peripheral standby electricity drain.",
                "Ensure home lighting uses energy-efficient LED bulbs rather than legacy incandescent bulbs."
            ]
        },
        {
            id: "daily-waste-04",
            title: "Clean Waste Segregation",
            description: "Properly rinse, dry, and sort dry recyclables from compostable and landfill waste.",
            category: "Waste Management",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Rinse food containers clean before placing them in recycling bins to prevent batch contamination.",
                "Separate clean dry paper and cardboard from soiled napkins or grease-stained food boxes.",
                "Keep plastic bottle caps attached or sorted according to your local municipality guidelines."
            ]
        },
        {
            id: "daily-tree-05",
            title: "Urban Canopy Care",
            description: "Learn about indigenous tree species in your neighborhood and inspect local foliage health.",
            category: "Biodiversity",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Identify at least 2 native tree species growing in your local park or street.",
                "Observe how tree canopies create microclimates and provide shade cooling urban heat islands.",
                "Check that surrounding soil beds are free of plastic litter and toxic runoff."
            ]
        },
        {
            id: "daily-transport-06",
            title: "Low-Carbon Commute",
            description: "Choose walking, bicycling, or public transit over single-occupancy vehicle travel.",
            category: "Sustainable Living",
            difficulty: "Medium",
            reward: 20,
            duration: "10 mins",
            actionSteps: [
                "Replace at least one short car trip under 2 kilometers with brisk walking or bicycling.",
                "Calculate carbon emissions avoided compared to driving a standard petrol vehicle.",
                "Plan and familiarize yourself with neighborhood bus, metro, or shared transit schedules."
            ]
        },
        {
            id: "daily-food-07",
            title: "Zero Food Waste Meal",
            description: "Plan meals to use leftovers creatively and compost organic fruit and vegetable peels.",
            category: "Food & Soil",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Inventory refrigerator produce and cook items closest to their expiration date.",
                "Portion meals appropriately to prevent unconsumed food waste ending up in landfills.",
                "Collect vegetable scrap trimmings for broth or aerobic organic compost."
            ]
        },
        {
            id: "daily-biodiversity-08",
            title: "Pollinator Haven Check",
            description: "Support local biodiversity by checking that outdoor spaces provide safe pollinator resources.",
            category: "Biodiversity",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Place a shallow dish with pebbles and clean water on a balcony or garden for visiting bees.",
                "Ensure flowering native plants provide pollen and nectar without chemical pesticides.",
                "Learn how pollinator health directly supports global agricultural food security."
            ]
        },
        {
            id: "daily-renewable-09",
            title: "Clean Energy Literacy",
            description: "Review rooftop solar, wind generation, or clean electricity supplier options.",
            category: "Renewable Energy",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Check your household utility bill for renewable energy tariffs or green power percentages.",
                "Learn the difference between grid feed-in solar tariffs and off-grid battery storage.",
                "Verify that household major appliances operate during peak daylight solar generation hours."
            ]
        },
        {
            id: "daily-ewaste-10",
            title: "E-Waste Triage & Safety",
            description: "Gather expired batteries, dead cables, and obsolete electronics for designated recycling.",
            category: "E-Waste",
            difficulty: "Easy",
            reward: 20,
            duration: "5 mins",
            actionSteps: [
                "Gather spent household alkaline and lithium batteries into a dry container for drop-off.",
                "Never dispose of rechargeable lithium batteries in standard curbside trash due to fire risks.",
                "Locate the nearest certified municipal e-waste recycling point or retail return box."
            ]
        }
    ],

    weeklyChallenges: [
        {
            id: "weekly-quiz-01",
            title: "Eco Knowledge Explorer",
            description: "Complete 5 environmental quizzes across any topic this week.",
            category: "Quiz Mastery",
            difficulty: "Medium",
            reward: 75,
            target: 5,
            type: "quiz_count"
        },
        {
            id: "weekly-climate-02",
            title: "Climate Change Specialist",
            description: "Complete 3 Climate Change quiz sessions this week.",
            category: "Climate Action",
            difficulty: "Hard",
            reward: 75,
            target: 3,
            type: "category_quiz_climate"
        },
        {
            id: "weekly-waste-03",
            title: "Waste Reduction Champion",
            description: "Complete 3 Waste Management quiz sessions this week.",
            category: "Waste Management",
            difficulty: "Medium",
            reward: 75,
            target: 3,
            type: "category_quiz_waste"
        },
        {
            id: "weekly-biodiversity-04",
            title: "Biodiversity Guardian",
            description: "Complete 3 Biodiversity quiz sessions this week.",
            category: "Conservation",
            difficulty: "Medium",
            reward: 75,
            target: 3,
            type: "category_quiz_biodiversity"
        },
        {
            id: "weekly-energy-05",
            title: "Clean Energy Pioneer",
            description: "Complete 3 Renewable Energy quiz sessions this week.",
            category: "Renewable Energy",
            difficulty: "Medium",
            reward: 75,
            target: 3,
            type: "category_quiz_energy"
        },
        {
            id: "weekly-habits-06",
            title: "Daily Habit Builder",
            description: "Complete at least 3 daily environmental challenges during the current week.",
            category: "Habit Building",
            difficulty: "Hard",
            reward: 75,
            target: 3,
            type: "daily_challenges_count"
        }
    ],

    // Benchmark sample participants for local ranking transparency
    benchmarkPlayers: [
        {
            id: "bench-01",
            name: "Elena Rostova",
            initials: "ER",
            level: 6,
            levelName: "Eco Master",
            totalXP: 1620,
            weeklyXP: 140,
            isDemo: true
        },
        {
            id: "bench-02",
            name: "Marcus Chen",
            initials: "MC",
            level: 5,
            levelName: "Earth Protector",
            totalXP: 1180,
            weeklyXP: 110,
            isDemo: true
        },
        {
            id: "bench-03",
            name: "Amina Al-Mansoor",
            initials: "AA",
            level: 5,
            levelName: "Earth Protector",
            totalXP: 980,
            weeklyXP: 90,
            isDemo: true
        },
        {
            id: "bench-04",
            name: "Liam O'Connor",
            initials: "LO",
            level: 4,
            levelName: "Green Champion",
            totalXP: 740,
            weeklyXP: 80,
            isDemo: true
        },
        {
            id: "bench-05",
            name: "Sofia Patel",
            initials: "SP",
            level: 3,
            levelName: "Nature Guardian",
            totalXP: 420,
            weeklyXP: 60,
            isDemo: true
        },
        {
            id: "bench-06",
            name: "Kaito Tanaka",
            initials: "KT",
            level: 2,
            levelName: "Eco Explorer",
            totalXP: 210,
            weeklyXP: 40,
            isDemo: true
        }
    ]
};

window.EcoChallengeData = EcoChallengeData;

