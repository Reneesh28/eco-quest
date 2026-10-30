/**
 * EcoQuest - Environmental Quiz Data Architecture
 * Contains structured question banks and category metadata for Phase 2
 */

const quizData = {
    climate: {
        id: "climate",
        title: "Climate Change",
        description: "Explore the atmospheric science of greenhouse gases, global temperature trends, and climate adaptation strategies.",
        difficulty: "Beginner & Intermediate",
        estimatedTime: "5–7 Mins",
        totalQuestions: 10,
        topics: ["Global warming", "Greenhouse gases", "Carbon footprint", "Climate adaptation", "Mitigation policies"],
        questions: [
            {
                id: 1,
                question: "Which gas is the largest contributor to human-induced global greenhouse emissions by volume?",
                options: [
                    "Methane (CH4)",
                    "Carbon dioxide (CO2)",
                    "Nitrous oxide (N2O)",
                    "Sulfur hexafluoride (SF6)"
                ],
                answer: 1,
                explanation: "Carbon dioxide (CO2) accounts for roughly 76% of total global greenhouse gas emissions, primarily driven by fossil fuel combustion and industrial processes."
            },
            {
                id: 2,
                question: "What natural phenomenon describes greenhouse gases trapping infrared heat in Earth's lower atmosphere?",
                options: [
                    "Greenhouse effect",
                    "Coriolis effect",
                    "Albedo reflection",
                    "Thermal inversion"
                ],
                answer: 0,
                explanation: "The greenhouse effect naturally moderates Earth's temperature, but excess anthropogenic emissions amplify this effect, causing progressive global warming."
            },
            {
                id: 3,
                question: "Which international agreement established the target of limiting global temperature rise to well below 2°C above pre-industrial levels?",
                options: [
                    "Montreal Protocol",
                    "Kyoto Protocol",
                    "Paris Agreement",
                    "Geneva Convention"
                ],
                answer: 2,
                explanation: "Adopted in 2015, the Paris Agreement commits 196 parties to pursue efforts to limit the temperature increase to 1.5°C above pre-industrial levels."
            },
            {
                id: 4,
                question: "What term describes the measurement of total greenhouse gas emissions caused directly and indirectly by an individual, organization, or product?",
                options: [
                    "Ecological index",
                    "Carbon footprint",
                    "Bio-capacity ratio",
                    "Emissions quotient"
                ],
                answer: 1,
                explanation: "A carbon footprint quantifies total greenhouse gas output expressed in equivalent tons of carbon dioxide (CO2e)."
            },
            {
                id: 5,
                question: "Why does Arctic sea ice melt accelerate global warming through a positive feedback loop?",
                options: [
                    "Ice melting releases dissolved carbon into coastal estuaries",
                    "Dark open ocean absorbs more sunlight than reflective white ice",
                    "Meltwater alters local cloud condensation nuclei",
                    "Subsurface ocean salinity drops, reducing water evaporation"
                ],
                answer: 1,
                explanation: "The ice-albedo feedback occurs because bright ice reflects up to 85% of solar radiation, while dark ocean water absorbs roughly 90%, speeding warming."
            },
            {
                id: 6,
                question: "Which potent greenhouse gas is released from decomposing organic matter in anaerobic conditions such as flooded rice paddies and landfill sites?",
                options: [
                    "Carbon monoxide",
                    "Ozone",
                    "Methane",
                    "Argon"
                ],
                answer: 2,
                explanation: "Methane (CH4) has a Global Warming Potential over 28 times greater than CO2 over a 100-year timescale."
            },
            {
                id: 7,
                question: "What is the primary cause of modern ocean acidification?",
                options: [
                    "Industrial chemical run-off from coastal rivers",
                    "Oceans absorbing excess atmospheric carbon dioxide",
                    "Thermal expansion of deep-sea seawater",
                    "Submarine volcanic sulfur emissions"
                ],
                answer: 1,
                explanation: "Earth's oceans absorb approximately 25-30% of anthropogenic CO2, forming carbonic acid which lowers pH and threatens calcifying marine organisms."
            },
            {
                id: 8,
                question: "What is an effective example of 'climate change adaptation' as opposed to mitigation?",
                options: [
                    "Replacing coal-fired power plants with solar farms",
                    "Building coastal seawalls to withstand elevated storm surges",
                    "Planting native mangrove forests to sequester carbon",
                    "Enforcing carbon tax policies on industrial emitters"
                ],
                answer: 1,
                explanation: "Adaptation refers to adjusting to actual or expected climate impacts (like seawalls or drought-resistant crops), whereas mitigation seeks to reduce emissions."
            },
            {
                id: 9,
                question: "Which natural ecosystem holds more carbon per acre in its soils than terrestrial rainforests?",
                options: [
                    "Coastal mangroves and peatlands",
                    "Temperate grasslands",
                    "Arid desert scrublands",
                    "Alpine tundra meadows"
                ],
                answer: 0,
                explanation: "Coastal blue carbon ecosystems (mangroves, tidal marshes, seagrasses) and peatlands store vast carbon volumes in deep waterlogged, low-oxygen soils."
            },
            {
                id: 10,
                question: "What milestone defines 'Net Zero' carbon emissions?",
                options: [
                    "Eliminating 100% of all machine-generated energy consumption",
                    "Balancing remaining greenhouse gas emissions with equivalent active removal",
                    "Transitioning exclusively to nuclear energy production",
                    "Restricting annual emissions to pre-1990 historical levels"
                ],
                answer: 1,
                explanation: "Net Zero is achieved when human-caused greenhouse gas emissions are balanced globally by anthropogenic removals over a specified period."
            }
        ]
    },

    waste: {
        id: "waste",
        title: "Waste Management",
        description: "Learn effective waste segregation, circular recycling pathways, organic composting, and responsible e-waste disposal.",
        difficulty: "Beginner & Intermediate",
        estimatedTime: "5–7 Mins",
        totalQuestions: 10,
        topics: ["Waste segregation", "Recycling", "Composting", "Plastic pollution", "E-waste"],
        questions: [
            {
                id: 1,
                question: "Which of the following materials can be recycled indefinitely without losing its chemical purity or physical quality?",
                options: [
                    "PET Plastic bottles",
                    "Cardboard packaging",
                    "Aluminum cans",
                    "Newsprint paper"
                ],
                answer: 2,
                explanation: "Aluminum and glass can be recycled perpetually without degradation, saving up to 95% of the energy needed to produce new metal from raw bauxite ore."
            },
            {
                id: 2,
                question: "In organic composting, what two broad categories of materials must be balanced for optimal decomposition?",
                options: [
                    "Acids and alkalis",
                    "Carbon-rich 'browns' and nitrogen-rich 'greens'",
                    "Silica grains and clay minerals",
                    "Polymers and biodegradable resins"
                ],
                answer: 1,
                explanation: "A balanced compost pile requires carbon-rich 'browns' (dry leaves, cardboard) and nitrogen-rich 'greens' (fruit scraps, vegetable trimmings) in roughly a 3:1 ratio."
            },
            {
                id: 3,
                question: "Why are single-use plastic grocery bags generally banned from standard curbside recycling bins?",
                options: [
                    "They emit toxic fumes when mixed with dry paper",
                    "They get tangled in mechanical sorting machinery at MRF facilities",
                    "They cannot chemically melt at standard industrial temperatures",
                    "They degrade too quickly in open sorting hoppers"
                ],
                answer: 1,
                explanation: "Thin flexible film plastic wraps around sorting rollers and conveyor shafts in Materials Recovery Facilities (MRFs), shutting down processing lines."
            },
            {
                id: 4,
                question: "What term describes the economic model focused on designing out waste and keeping materials in continuous circulation?",
                options: [
                    "Linear throughput economy",
                    "Circular economy",
                    "Extraction-disposal model",
                    "Accelerated turnover market"
                ],
                answer: 1,
                explanation: "A circular economy aims to decouple economic activity from the consumption of finite resources through reduction, reuse, remanufacture, and recycling."
            },
            {
                id: 5,
                question: "Which of the following items is classified as hazardous electronic waste (e-waste) requiring specialized certified collection?",
                options: [
                    "Uncoated wooden toothpicks",
                    "Rechargeable lithium-ion batteries",
                    "Ceramic coffee mugs",
                    "Cotton cleaning rags"
                ],
                answer: 1,
                explanation: "Lithium-ion batteries contain heavy metals and can ignite under pressure in standard garbage trucks, necessitating dedicated e-waste drops."
            },
            {
                id: 6,
                question: "What toxic liquid is produced when rainwater percolates through decomposing landfill waste?",
                options: [
                    "Leachate",
                    "Effluent brine",
                    "Slurry condensate",
                    "Graywater"
                ],
                answer: 0,
                explanation: "Leachate is a contaminated liquid that dissolves harmful chemicals from garbage; modern engineered landfills use liners and collection pumps to treat it."
            },
            {
                id: 7,
                question: "What does the resin identification code '1' inside a recycling triangle typically indicate?",
                options: [
                    "Polypropylene (PP)",
                    "Polyethylene Terephthalate (PET or PETE)",
                    "High-Density Polyethylene (HDPE)",
                    "Polystyrene (PS)"
                ],
                answer: 1,
                explanation: "Code 1 represents PET (Polyethylene Terephthalate), commonly utilized for clear water bottles, soda containers, and food jars."
            },
            {
                id: 8,
                question: "What happens when food waste is disposed of in airtight landfills instead of being composted aerobically?",
                options: [
                    "It transforms safely into inert silica stone",
                    "It breaks down anaerobically and generates methane gas",
                    "It freezes decomposition and stays non-reactive",
                    "It neutralizes hazardous heavy metals naturally"
                ],
                answer: 1,
                explanation: "Deprived of oxygen beneath layers of trash, organic matter is digested by anaerobic bacteria, releasing significant quantities of methane gas."
            },
            {
                id: 9,
                question: "In the universal waste hierarchy, which strategy is prioritized as the most environmentally beneficial?",
                options: [
                    "Recycling into new containers",
                    "Thermal energy recovery from waste",
                    "Source reduction and prevention",
                    "Sanitary landfill isolation"
                ],
                answer: 2,
                explanation: "The waste hierarchy ranks 'Reduce' at the top because preventing waste from being generated avoids the need for material extraction, processing, and disposal."
            },
            {
                id: 10,
                question: "What environmental problem is caused by microplastics in marine ecosystems?",
                options: [
                    "They bioaccumulate in marine food webs and adsorb toxic pollutants",
                    "They cause sudden increases in deep ocean temperatures",
                    "They completely deplete atmospheric oxygen in coastal air",
                    "They speed up the natural evaporation of freshwater bays"
                ],
                answer: 0,
                explanation: "Microplastics (<5mm) are ingested by plankton, fish, and filter-feeders, introducing absorbed toxic chemicals into the marine food chain."
            }
        ]
    },

    biodiversity: {
        id: "biodiversity",
        title: "Biodiversity",
        description: "Discover ecosystem balances, endangered species protections, habitat fragmentation solutions, and food web dynamics.",
        difficulty: "Beginner & Intermediate",
        estimatedTime: "5–7 Mins",
        totalQuestions: 10,
        topics: ["Ecosystems", "Endangered species", "Deforestation", "Conservation", "Food chains"],
        questions: [
            {
                id: 1,
                question: "What ecological role does a 'keystone species' play in its native environment?",
                options: [
                    "It is the single most numerous organism in the local habitat",
                    "It has a disproportionately large effect on ecosystem structure relative to its abundance",
                    "It is an exotic species introduced to control invasive agricultural pests",
                    "It only consumes inorganic minerals and rock lichen"
                ],
                answer: 1,
                explanation: "If a keystone species (such as sea otters in kelp forests or gray wolves in Yellowstone) is removed, the ecosystem often undergoes drastic collapse."
            },
            {
                id: 2,
                question: "What is currently recognized as the single largest driver of terrestrial biodiversity loss globally?",
                options: [
                    "Habitat destruction and land-use change",
                    "Volcanic ash fall and seismic events",
                    "Geomagnetic field shifts",
                    "Natural competitive speciation"
                ],
                answer: 0,
                explanation: "Habitat conversion for agriculture, logging, mining, and urban development represents the predominant direct threat to terrestrial species worldwide."
            },
            {
                id: 3,
                question: "Which global organization compiles the official 'Red List' assessing the conservation extinction risk of wild species?",
                options: [
                    "UNESCO",
                    "World Health Organization (WHO)",
                    "International Union for Conservation of Nature (IUCN)",
                    "United Nations Development Programme (UNDP)"
                ],
                answer: 2,
                explanation: "The IUCN Red List is the world's most comprehensive inventory of the global conservation status of biological species."
            },
            {
                id: 4,
                question: "What is an ecological 'wildlife corridor' designed to achieve?",
                options: [
                    "To herd migratory wildlife away from tourist parks",
                    "To connect fragmented natural patches, enabling safe animal migration and genetic exchange",
                    "To confine apex predators strictly within artificial sanctuaries",
                    "To construct elevated high-speed freight railways"
                ],
                answer: 1,
                explanation: "Wildlife corridors link severed habitats, allowing species to forage, migrate, avoid inbreeding, and adapt to changing regional climates."
            },
            {
                id: 5,
                question: "In an ecological food chain, why does available energy diminish by roughly 90% at each successive trophic level?",
                options: [
                    "Energy is destroyed by planetary gravitation",
                    "Organisms expend energy through metabolic respiration and heat loss (Ten Percent Rule)",
                    "Lower-level producers consume sunlight inefficiently",
                    "Energy transforms into heavy soil minerals"
                ],
                answer: 1,
                explanation: "According to Lindeman's Ten Percent Law, only roughly 10% of chemical energy transfers to the next trophic level; the rest is lost as metabolic heat."
            },
            {
                id: 6,
                question: "What vital ecological service do pollinators like bees, bats, and butterflies provide to human food supplies?",
                options: [
                    "They fix atmospheric nitrogen directly into plant root nodules",
                    "They facilitate cross-pollination necessary for roughly 75% of leading global food crops",
                    "They aerate agricultural soils and break up clay hardpans",
                    "They prevent fungal rot by lowering ambient greenhouse humidity"
                ],
                answer: 1,
                explanation: "Nearly three-quarters of all cultivated flowering crops producing fruits, vegetables, and seeds depend directly or partially on animal pollination."
            },
            {
                id: 7,
                question: "Why are endemic species particularly vulnerable to extinction?",
                options: [
                    "They possess short lifespans and lay sterile eggs",
                    "They are native to only one specific geographic location and have limited distribution",
                    "They migrate across all continents every season",
                    "They only feed on domesticated farm livestock"
                ],
                answer: 1,
                explanation: "Endemic species (like Madagascar lemurs or Galápagos tortoises) exist solely in one localized habitat, making them vulnerable to local habitat damage."
            },
            {
                id: 8,
                question: "What marine structures are referred to as the 'rainforests of the sea' due to supporting 25% of all ocean life despite occupying under 1% of the seafloor?",
                options: [
                    "Hydrothermal vent plumes",
                    "Coral reefs",
                    "Abyssal mud plains",
                    "Sargasso weed drifts"
                ],
                answer: 1,
                explanation: "Coral reefs provide essential structural nursery and foraging habitats for more than 4,000 fish species and a quarter of marine biodiversity."
            },
            {
                id: 9,
                question: "What is the primary danger posed by invasive non-native species when introduced into a naive ecosystem?",
                options: [
                    "They consume inorganic gravel and deplete riverbeds",
                    "They outcompete, prey upon, or introduce novel pathogens to native flora and fauna",
                    "They increase ambient soil temperatures beyond survivable levels",
                    "They prevent rain clouds from precipitating moisture"
                ],
                answer: 1,
                explanation: "Free from natural predators and diseases from their homeland, invasive species rapidly outcompete native species for food, shelter, and water."
            },
            {
                id: 10,
                question: "Which of the following describes 'genetic diversity' within an endangered species population?",
                options: [
                    "The number of different species sharing a common watershed",
                    "The variety of genetic characteristics within a single species that aids survival against disease",
                    "The spatial elevation differences between mountain colonies",
                    "The seasonal variation in reproductive cycles"
                ],
                answer: 1,
                explanation: "High genetic diversity provides a resilient gene pool, equipping species with natural resistance traits against novel pathogens and changing environmental conditions."
            }
        ]
    },

    energy: {
        id: "energy",
        title: "Renewable Energy",
        description: "Master clean energy principles including photovoltaic solar, onshore and offshore wind, geothermal loops, and smart grid storage.",
        difficulty: "Beginner & Intermediate",
        estimatedTime: "5–7 Mins",
        totalQuestions: 10,
        topics: ["Solar energy", "Wind energy", "Hydroelectric power", "Geothermal energy", "Sustainable energy practices"],
        questions: [
            {
                id: 1,
                question: "What physical effect allows photovoltaic (PV) solar panels to convert photons of sunlight directly into direct current (DC) electricity?",
                options: [
                    "Thermoelectric effect",
                    "Photoelectric effect",
                    "Piezoelectric effect",
                    "Doppler effect"
                ],
                answer: 1,
                explanation: "In the photoelectric effect, photons striking semiconductor materials (such as silicon) liberate free electrons, generating an electrical current."
            },
            {
                id: 2,
                question: "How do modern utility-scale wind turbines generate electricity from moving air?",
                options: [
                    "Air friction heats turbine blades to boil pressurized water",
                    "Wind aerodynamic lift turns rotor blades connected to an internal electrical generator",
                    "Sound vibrations in the tower stimulate magnetic induction rings",
                    "Centrifugal force condenses ambient air moisture into hydro-jets"
                ],
                answer: 1,
                explanation: "Wind flows over aerodynamically shaped blades, creating aerodynamic lift that causes the rotor to spin a shaft connected through a gearbox to a generator."
            },
            {
                id: 3,
                question: "What natural heat source powers deep geothermal power stations?",
                options: [
                    "Solar heat trapped within shallow asphalt pavements",
                    "Thermal decay of minerals and magma heat inside Earth's crust",
                    "Atmospheric friction during lightning discharges",
                    "Combustion of deep subterranean methane pockets"
                ],
                answer: 1,
                explanation: "Geothermal energy taps natural steam and hot water reservoirs heated by Earth's molten core and radioactive decay of deep sub-surface rocks."
            },
            {
                id: 4,
                question: "What major challenge is associated with solar and wind power on the electrical grid?",
                options: [
                    "They permanently contaminate local freshwater rivers during operation",
                    "Their power generation is intermittent, depending on sun and wind availability",
                    "They consume massive amounts of fossil fuel during daily running",
                    "They emit high volumes of sulfur dioxide while generating power"
                ],
                answer: 1,
                explanation: "Because the wind does not always blow and the sun does not shine at night, clean energy grids require battery storage and interconnected power systems."
            },
            {
                id: 5,
                question: "Which form of renewable energy currently produces the greatest total gigawatt-hours of electricity worldwide?",
                options: [
                    "Tidal barrage generation",
                    "Hydroelectric power",
                    "Wave surface converters",
                    "Geothermal steam turbines"
                ],
                answer: 1,
                explanation: "Hydroelectric power remains the single largest renewable electricity source globally, generating over 4,000 TWh annually."
            },
            {
                id: 6,
                question: "How does a 'Pumped Storage Hydroelectricity' facility function as a grid-scale battery?",
                options: [
                    "It pumps compressed air into abandoned coal mines",
                    "It pumps water to an elevated reservoir during low-demand periods and releases it through turbines during peak hours",
                    "It uses boiling water to spin solar heat collectors",
                    "It filters sediment from rivers to increase water velocity"
                ],
                answer: 1,
                explanation: "Pumped hydro pumps water uphill when energy is abundant and cheap, then releases it through gravity-fed turbines when demand peaks, storing bulk energy."
            },
            {
                id: 7,
                question: "What is the primary operational byproduct emitted by a hydrogen fuel cell vehicle during driving?",
                options: [
                    "Pure water vapor (H2O)",
                    "Carbon monoxide (CO)",
                    "Sulfur dioxide (SO2)",
                    "Particulate soot (PM2.5)"
                ],
                answer: 0,
                explanation: "Hydrogen fuel cells combine pressurized hydrogen gas with atmospheric oxygen electrochemically, producing electricity with only pure water and heat as byproducts."
            },
            {
                id: 8,
                question: "What is the function of an electrical power inverter in a residential rooftop solar system?",
                options: [
                    "It converts DC electricity produced by panels into standard AC electricity for household appliances",
                    "It pumps cold coolant into panel circuits to prevent overheating",
                    "It tracks cloud formations via radar to steer panels",
                    "It stores electrical power as mechanical kinetic energy"
                ],
                answer: 0,
                explanation: "Solar panels produce Direct Current (DC), but residential homes and regional grids run on Alternating Current (AC), requiring an inverter."
            },
            {
                id: 9,
                question: "Why do offshore wind farms generally generate more energy per square meter than onshore wind installations?",
                options: [
                    "Marine air contains more nitrogen than continental air",
                    "Ocean winds are stronger, smoother, and more consistent without terrain obstacles",
                    "Ocean water conducts electricity upwards through the steel mast",
                    "Salt spray accelerates rotor blade rotation speeds"
                ],
                answer: 1,
                explanation: "Without trees, hills, or buildings creating surface friction, ocean winds blow consistently at higher velocities, driving higher capacity factors."
            },
            {
                id: 10,
                question: "What energy-efficiency strategy delivers the quickest and most cost-effective environmental benefit before installing renewable capacity?",
                options: [
                    "Energy conservation and efficiency improvements (insulation, LED lighting, heat pumps)",
                    "Upgrading all decorative exterior lights to higher wattages",
                    "Running industrial motors at maximum velocity permanently",
                    "Replacing electrical meters with manual analog gauges"
                ],
                answer: 0,
                explanation: "The 'negawatt' concept states that the greenest and cheapest kilowatt-hour is the one that never needs to be produced in the first place."
            }
        ]
    }
};

window.quizData = quizData;

