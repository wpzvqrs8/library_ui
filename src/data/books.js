/* ============================================================
   ARCANA — All Mock Data
   ============================================================ */

export const BOOKS = [
  { id: 1,  title: "The Oxford Compendium",       author: "Dr. A. Mehta",       category: "History",     color: "#4A1942", year: 2021, desc: "A sweeping account of academic thought across five centuries." },
  { id: 2,  title: "Principles of Thermodynamics", author: "Prof. R. Sharma",    category: "Engineering", color: "#1A3A4A", year: 2022, desc: "Foundational engineering thermodynamics for undergraduates." },
  { id: 3,  title: "The Gujarati Renaissance",     author: "N. Patel",           category: "Literature",  color: "#3A1A1A", year: 2020, desc: "Poetry and prose from Gujarat's literary golden age." },
  { id: 4,  title: "Quantum Mechanics Vol. II",    author: "Dr. S. Iyer",        category: "Physics",     color: "#1A2A3A", year: 2023, desc: "Advanced quantum theory for postgraduate students." },
  { id: 5,  title: "Laws of Civil Procedure",      author: "Justice K. Rao",     category: "Law",         color: "#2A1A0A", year: 2019, desc: "A landmark reference on Indian civil court procedure." },
  { id: 6,  title: "Organic Chemistry Decoded",    author: "Dr. P. Joshi",       category: "Chemistry",   color: "#0A2A1A", year: 2022, desc: "Mechanisms, reactions, and synthesis simplified." },
  { id: 7,  title: "Architecture of Empires",      author: "M. Desai",           category: "Architecture",color: "#2A2A0A", year: 2021, desc: "Built environments of the ancient world reimagined." },
  { id: 8,  title: "Neural Networks Explained",    author: "Dr. V. Krishnan",    category: "CS / AI",     color: "#1A0A2A", year: 2023, desc: "From perceptrons to transformers — a complete journey." },
  { id: 9,  title: "Macroeconomic Theory",         author: "Prof. A. Shah",      category: "Economics",   color: "#3A2A0A", year: 2020, desc: "Growth, inflation, and fiscal policy in emerging markets." },
  { id: 10, title: "The Human Genome",             author: "Dr. R. Nair",        category: "Biology",     color: "#0A1A2A", year: 2022, desc: "A complete guide to genomics and genetic engineering." },
  { id: 11, title: "Sanskrit Grammar: Roots",      author: "Prof. D. Bhatt",     category: "Languages",   color: "#4A2A0A", year: 2018, desc: "Classical Sanskrit morphology and syntax for scholars." },
  { id: 12, title: "Fluid Mechanics",              author: "Dr. H. Parmar",      category: "Engineering", color: "#0A3A2A", year: 2021, desc: "Viscosity, turbulence, and flow — theory and problems." },
  { id: 13, title: "Indian Philosophy: Advaita",   author: "Swami A. Sharma",    category: "Philosophy",  color: "#2A0A1A", year: 2017, desc: "Non-dualism and consciousness in Vedantic tradition." },
  { id: 14, title: "Calculus: Theory & Practice",  author: "Dr. M. Trivedi",     category: "Mathematics", color: "#0A2A3A", year: 2023, desc: "Real analysis, integration, and multivariable calculus." },
  { id: 15, title: "Clinical Psychology Today",    author: "Dr. S. Mehrotra",    category: "Psychology",  color: "#3A0A2A", year: 2022, desc: "Assessment, diagnosis, and modern therapeutic approaches." },
  { id: 16, title: "Environmental Law in India",   author: "A. Menon",           category: "Law",         color: "#1A3A0A", year: 2020, desc: "Pollution regulation, forest rights, and constitutional law." },
  { id: 17, title: "Art History: Modern India",    author: "P. Varma",           category: "Arts",        color: "#3A1A3A", year: 2019, desc: "From the Bengal School to contemporary Indian artists." },
  { id: 18, title: "Database Systems Design",      author: "Dr. K. Pillai",      category: "CS",          color: "#0A1A3A", year: 2023, desc: "Relational models, query optimization, and NoSQL." },
  { id: 19, title: "Strength of Materials",        author: "Prof. B. Chaudhary", category: "Civil Engg",  color: "#2A1A2A", year: 2021, desc: "Stress, strain, and structural analysis fundamentals." },
  { id: 20, title: "The Poetics of Silence",       author: "Dr. L. Kapoor",      category: "Literature",  color: "#1A1A0A", year: 2020, desc: "A meditation on absence and meaning in modern fiction." },
];

export const FEATURED = [
  { title: "Neural Networks Explained",    author: "Dr. V. Krishnan", category: "CS / AI",     available: true,  copies: 4, color: "#1A0A2A" },
  { title: "The Oxford Compendium",        author: "Dr. A. Mehta",    category: "History",      available: true,  copies: 2, color: "#4A1942" },
  { title: "Quantum Mechanics Vol. II",    author: "Dr. S. Iyer",     category: "Physics",      available: false, copies: 0, color: "#1A2A3A" },
  { title: "Organic Chemistry Decoded",    author: "Dr. P. Joshi",    category: "Chemistry",    available: true,  copies: 6, color: "#0A2A1A" },
  { title: "Database Systems Design",      author: "Dr. K. Pillai",   category: "CS",           available: true,  copies: 3, color: "#0A1A3A" },
  { title: "Art History: Modern India",    author: "P. Varma",        category: "Arts",         available: true,  copies: 1, color: "#3A1A3A" },
];

export const CATEGORIES = [
  { name: "Engineering",       count: 142, icon: "⚙️", desc: "Civil, Mech, Electrical & more" },
  { name: "Literature",        count: 89,  icon: "📖", desc: "Poetry, fiction & criticism" },
  { name: "Law",               count: 76,  icon: "⚖️", desc: "Constitutional, civil & criminal" },
  { name: "Sciences",          count: 201, icon: "🔬", desc: "Physics, Chemistry, Biology" },
  { name: "Arts & History",    count: 64,  icon: "🏛️", desc: "Art history & cultural studies" },
  { name: "Computer Science",  count: 118, icon: "💻", desc: "AI, databases & systems" },
];

export const STATS = [
  { value: 12400, label: "E-Books Available",  suffix: "+" },
  { value: 3200,  label: "Active Readers",     suffix: "+" },
  { value: 48,    label: "Subject Categories", suffix: ""  },
  { value: 98,    label: "Satisfaction Rate",  suffix: "%" },
];

export const HOW_IT_WORKS = [
  { step: "01", icon: "🔐", title: "Login with College ID",  body: "Use your institutional email to access the full catalog securely." },
  { step: "02", icon: "🔍", title: "Search & Discover",      body: "Browse 12,000+ titles across all departments with powerful filters." },
  { step: "03", icon: "📖", title: "Read Anywhere",          body: "Open any e-book in our built-in reader — no downloads required." },
];

export const TESTIMONIALS = [
  { quote: "Finding research papers for my thesis used to take hours. Now I search and read within seconds.", name: "Priya Sharma",     role: "M.Sc. Chemistry, 3rd Year",             initials: "PS" },
  { quote: "As faculty, I appreciate being able to recommend specific chapters directly to students via the platform.", name: "Prof. Rahul Mehta", role: "Department of Civil Engineering",  initials: "RM" },
  { quote: "The 3D bookshelf is genuinely the most beautiful library interface I have ever used.",  name: "Aditya Patel",     role: "B.Tech Computer Science, 2nd Year",     initials: "AP" },
];
