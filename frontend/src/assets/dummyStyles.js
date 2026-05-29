// assets/dummyStyles.js

// Central color tokens used by styles (keeps palette consistent)
export const COLORS = {
  primary: '#7C5CFA', // warm violet
  accent: '#06B6D4', // cyan
  ai: '#8B5CF6',
  success: '#10B981',
  expense: '#FB923C',
  bg: '#0B1220',
  surface: '#0F1724',
  muted: '#94A3B8',
};

// Dashboard styles (restored)
export const dashboardStyles = {
  // Layout styles
  container: "min-h-screen p-6 md:p-8 lg:p-10",

  // Header styles (refined gradient, spacing, typography)
  headerContainer: "rounded-3xl p-8 mb-8 bg-gradient-to-br from-[#071029] via-[#0b1530] to-[#07203a] border border-white/6 shadow-[0_18px_60px_rgba(2,6,23,0.7)]",
  headerContent: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6",
  headerTitle: "text-4xl md:text-5xl font-extrabold tracking-tight text-white",
  headerSubtitle: "text-slate-300 mt-2 text-lg",

  // Button styles (stronger, smoother gradient and shadow)
  addButton: "flex items-center gap-3 bg-gradient-to-r from-[#7C5CFA] to-[#06B6D4] text-white px-5 py-3 rounded-xl transition-transform transform hover:-translate-y-0.5 shadow-lg font-semibold",

  // Time frame selector styles
  timeFrameContainer: "flex justify-end mt-4",
  timeFrameWrapper: "inline-flex gap-1 bg-[rgba(255,255,255,0.03)] rounded-lg p-1 border border-white/8",
  timeFrameButton: (isActive) =>
    `px-3 py-1.5 text-sm rounded-md transition-colors ${
      isActive ? 'bg-[#06B6D4] text-[#062B32] font-semibold shadow-md' : 'text-slate-300 hover:bg-white/6'
    }`,

  // Summary cards grid
summaryGrid: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",

  // Financial card styles
  balanceBadge: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-white",
  expenseBadge: "inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-[rgba(251,146,60,0.09)] text-[#FB923C]",

  // Gauge container styles
  gaugeGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",

  // Pie chart container styles
  pieChartContainer: "hidden md:block rounded-xl p-6 bg-gradient-to-br from-[#071126] to-[#0b1728] border border-white/6 shadow-[0_20px_40px_rgba(2,6,23,0.65)] mb-8 relative overflow-hidden",
  pieChartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3",
  pieChartTitle: "text-xl font-semibold text-white",
  pieChartSubtitle: "text-sm text-slate-300",
  pieChartHeight: "h-72",

  // Pie chart tooltip styles
  tooltipContent: {
    backgroundColor: "rgba(2,6,23,0.9)",
    border: "1px solid rgba(124,92,250,0.08)",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
    padding: "12px",
  },
  tooltipItem: { fontWeight: 400 },

  // Legend styles
  legendWrapper: { paddingTop: 8 },
  legendText: "text-sm font-medium text-slate-300",

  // Income/Expense lists grid
  listsGrid: "grid grid-cols-1 gap-6",

  // List container styles (surface toned)
  listContainer: "rounded-xl p-4 md:p-6 bg-[rgba(255,255,255,0.02)] border border-white/6 shadow-md",
  listHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3",
  listTitle: "text-xl font-semibold text-white md:mt-0 mt-1 flex items-center gap-3",
  listSubtitle: "text-sm text-slate-300 font-normal",

  // Record count badges
  incomeCountBadge: "text-sm bg-[rgba(16,185,129,0.08)] px-2 mx-2 text-[rgba(16,185,129,0.96)] md:mx-2 md:mt-2 py-1 rounded-full",
  expenseCountBadge: "text-sm bg-[rgba(251,146,60,0.08)] text-[#FB923C] px-2 mx-2 md:mx-2 md:mt-2 py-1 rounded-full",

  // Transaction item styles
  transactionList: "space-y-3",
  incomeTransactionItem: "flex items-center px-3 py-3 justify-between rounded-lg bg-[rgba(16,185,129,0.06)] border border-white/4",
  expenseTransactionItem: "flex items-center px-3 py-3 justify-between rounded-lg bg-[rgba(251,146,60,0.06)] border border-white/4",

  // Transaction icon container
  incomeIconContainer: "p-2 bg-[rgba(16,185,129,0.12)] rounded-lg",
  expenseIconContainer: "p-2 bg-[rgba(251,146,60,0.12)] rounded-lg",

  // Transaction content
  transactionContent: "flex items-center lg:gap-3 md:gap-3 gap-2",
  transactionDescription: "font-medium text-white",
  transactionCategory: "text-sm text-slate-300",
  transactionAmount: "text-right font-semibold",
  incomeAmount: "text-[rgba(16,185,129,0.96)] font-semibold",
  expenseAmount: "text-[rgba(251,146,60,0.96)] font-semibold",
  transactionDate: "text-sm text-slate-400",

  // Empty state styles
  emptyState: "text-center py-8 text-slate-400",
  emptyIconContainer: (color) => `w-16 h-16 mx-auto mb-4 rounded-full ${color} flex items-center justify-center`,
  emptyText: "text-slate-400 font-medium",

  // View all button styles
  viewAllContainer: "pt-4 border-t border-white/8",
  viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-white font-medium bg-white/6 hover:bg-white/8 rounded-xl transition-colors",

  // Icon container styles
  iconContainer: (color) => `p-2 ${color} rounded-lg`,

  // Specific icon colors
  walletIconContainer: "p-2 bg-[rgba(124,92,250,0.12)] rounded-lg",
  arrowDownIconContainer: "p-2 bg-[rgba(251,146,60,0.08)] rounded-lg",
  piggyBankIconContainer: "p-2 bg-[rgba(6,182,212,0.08)] rounded-lg",
};

// Additional styles for financial trends
export const trendStyles = {
  positive: "text-orange-600",
  negative: "text-green-600",
  positiveRate: "bg-teal-100 text-teal-700",
  negativeRate: "bg-red-100 text-red-700",
};

// Chart specific styles
export const chartStyles = {
  pieChart: "lg:-px-5 lg:text-xs xl:text-xl",
};

// Add to existing dummyStyles.js
export const incomeStyles = {
  // Layout
  wrapper: "space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
  headerContainer: "rounded-2xl md:rounded-2xl p-6 md:p-8 -mx-4 md:-mx-7 overflow-x-hidden mb-6 md:mb-8 bg-gradient-to-br from-[#0F172A] via-[#071029] to-[#0F172A] border border-white/8 shadow-2xl",
  header: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 mb-4 md:mb-6",
  headerTitle: "text-2xl md:text-3xl lg:text-4xl font-extrabold text-white",
  headerSubtitle: "text-slate-300 mt-1 text-sm md:text-base",
  addButton: "inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white px-4 py-2 md:px-5 md:py-3 rounded-2xl transition transform hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-2xl font-semibold text-sm md:text-base",

  // Summary Cards
  summaryGrid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-6",

  // Chart
  chartContainer: "hidden md:block -mx-4 md:-mx-7 bg-[#0F172A] rounded-2xl p-6 md:p-8 shadow-2xl border border-white/8 text-white",
  chartTitle: "text-lg md:text-xl font-semibold text-white mb-4 md:mb-5 flex items-center gap-2 md:gap-3",

  // Transaction List
  listContainer: "bg-gradient-to-br from-[#071126] to-[#0b1728] rounded-2xl -mx-4 md:rounded-2xl p-4 md:p-6 shadow-xl border border-white/8 relative overflow-hidden",
  sectionTitle: "text-lg md:text-xl font-semibold text-white mb-4 md:mb-5 flex items-center gap-2 md:gap-3",

  // Filter Section
  filterContainer: "flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto",
  filterSelect: "appearance-none bg-[#0b1728] text-slate-200 border border-white/10 rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent w-full",
  exportButton: "flex items-center justify-center gap-1 bg-transparent border border-white/10 text-slate-200 px-3 py-2 rounded-xl transition hover:bg-white/4 text-sm w-full sm:w-auto",

  // Transaction Items
  transactionList: "space-y-4 -mx-3 lg:-mx-0 md:-mx-0",
  viewAllButton: "mt-4 w-full text-center py-3 text-white font-medium bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-2xl hover:shadow-2xl transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2",

  // Empty State
  emptyStateContainer: "text-center py-6 md:py-8",
  emptyStateIcon: "w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-[rgba(99,102,241,0.12)] flex items-center justify-center text-[#6366F1]",
  emptyStateText: "text-slate-300 font-medium text-sm md:text-base",
  emptyStateSubtext: "text-xs md:text-sm text-slate-400 mt-1 md:mt-2",
  emptyStateButton: "mt-3 md:mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 font-medium",

  // Time Frame Selector Container
  timeFrameContainer: "flex px-4 -mx-4 justify-center lg:justify-end md:justify-end mt-4",

   // Chart header container 
  chartHeaderContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5",
  
  // Chart height 
  chartHeight: "h-64 md:h-80",
  
  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "rgba(2,6,23,0.95)",
    border: "1px solid rgba(99,102,241,0.08)",
    borderRadius: "0.75rem",
    boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
    padding: "12px",
    backdropFilter: "blur(6px)",
  },
  
  // Icon container styles for summary cards 
  iconGreen: "p-2 bg-[rgba(16,185,129,0.08)] rounded-lg",
  iconBlue: "p-2 bg-[rgba(6,182,212,0.08)] rounded-lg",
  iconPurple: "p-2 bg-[rgba(99,102,241,0.08)] rounded-lg",
  
  // Icon text colors 
  textGreen: "text-[#10B981]",
  textBlue: "text-[#06B6D4]",
  textPurple: "text-[#6366F1]",
  
  // Filter icon positioning 
  filterIcon: "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-slate-400 pointer-events-none",
  
  // FinancialCard border colors (if needed, similar to expense page)
  borderGreen: "border-l-4 border-[#10B981]",
  borderBlue: "border-l-4 border-[#06B6D4]",
  borderPurple: "border-l-4 border-[#6366F1]",
};

export const expensePageStyles = {
  // Main container
  container: "space-y-6 max-w-7xl mx-auto p-4 md:p-6 bg-[linear-gradient(180deg,#020617_0%,#071129_50%,#0F172A_100%)]",
  
  // Header card
  headerCard: "bg-gradient-to-br from-[#071129] via-[#0F172A] to-[#020617] rounded-2xl p-6 md:p-8 -mx-3.5 lg:-mx-0 overflow-x-hidden mb-8 shadow-2xl border border-[rgba(255,255,255,0.08)] backdrop-blur-sm relative shadow-[0_20px_60px_rgba(2,6,23,0.6),0_8px_40px_rgba(249,115,22,0.12)]",
  headerContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 mb-4 md:mb-6",
  headerTitle: "text-2xl md:text-3xl font-extrabold text-white",
  headerSubtitle: "text-slate-200 mt-1",
  addButton: "inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-4 py-2 md:px-5 md:py-3 rounded-xl transition transform hover:-translate-y-0.5 hover:scale-105 shadow-2xl shadow-[0_12px_40px_rgba(249,115,22,0.18)] font-semibold",
  
  // Financial cards grid
  cardsGrid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6",
  
  // Chart container
  chartContainer: "hidden md:block bg-[rgba(15,23,42,0.6)] backdrop-blur-sm rounded-2xl p-6 md:p-8 -mx-7 lg:-mx-0 shadow-2xl border border-[rgba(255,255,255,0.08)] text-white",
  chartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5",
  chartTitle: "text-xl font-semibold text-white mb-5 flex items-center gap-3",
  exportButton: "flex items-center gap-1 bg-transparent border border-[rgba(255,255,255,0.06)] text-slate-200 px-4 py-2 rounded-xl transition hover:bg-[rgba(255,255,255,0.02)] text-sm hover:shadow-md",
  chart: "h-80",
  
  // Transactions container
  transactionsContainer: "bg-[rgba(15,23,42,0.55)] backdrop-blur-sm rounded-2xl p-5 -mx-4 lg:-mx-0 md:-mx-5 shadow-2xl border border-[rgba(255,255,255,0.08)] relative overflow-hidden",
  transactionsHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-5",
  transactionsTitle: "text-lg md:text-xl font-semibold text-white mb-4 md:mb-5 flex items-center gap-2 md:gap-3",
  filterSelect: "appearance-none bg-[rgba(15,23,42,0.4)] text-slate-200 border border-[rgba(255,255,255,0.06)] rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent w-full",
  
  // Transaction items
  transactionsList: "space-y-4 -mx-2 lg:-mx-0 md:-mx-0",
  viewAllButton: "mt-4 w-full text-center py-3 text-white font-medium bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-xl hover:shadow-2xl transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2",
  emptyState: "text-center py-8",
  emptyStateIcon: "w-20 h-20 mx-auto mb-4 rounded-2xl bg-[rgba(249,115,22,0.08)] flex items-center justify-center text-[#F97316]",
  emptyStateText: "text-slate-200 font-medium",
  emptyStateSubtext: "text-sm text-slate-300 mt-2",
  
  // Icons
  iconOrange: "p-3 bg-[rgba(249,115,22,0.06)] rounded-xl text-[#F97316]",
  iconAmber: "p-3 bg-[rgba(249,115,22,0.04)] rounded-xl text-[#F97316]",
  iconYellow: "p-3 bg-[rgba(249,115,22,0.03)] rounded-xl text-[#F97316]",
  textOrange: "text-[#F97316]",
  textAmber: "text-[#EA580C]",
  textYellow: "text-[#FBBF24]",
  
  // Borders
  borderOrange: "border-l-4 border-[#F97316]",
  borderAmber: "border-l-4 border-[#EA580C]",
  borderYellow: "border-l-4 border-[#FBBF24]",
  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "rgba(2,6,23,0.95)",
    border: "1px solid rgba(249,115,22,0.06)",
    borderRadius: "0.75rem",
    boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
    padding: "12px",
    backdropFilter: "blur(6px)",
  },
  
  // Chart height style 
  chartHeight: "h-80",
  
  // Export button for chart header (different from existing exportButton)
  chartExportButton: "flex items-center gap-1 bg-transparent border border-[rgba(255,255,255,0.06)] text-slate-200 px-4 py-2 rounded-xl transition hover:bg-[rgba(255,255,255,0.02)] text-sm hover:shadow-md",
  
  // Additional empty state style 
  emptyStateSubtext: "text-sm text-slate-300 mt-2",
  
  // Timeframe positioning 
  timeframePositioning: "flex px-4 -mx-4 justify-center lg:-mx-0 md:-mx-0 lg:justify-end md:justify-end mt-4",
  
  // Transaction item specific styles 
  transactionItemContainer: "flex items-center justify-between p-3 -mx-2 rounded-2xl transition-all duration-300 border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer mb-3 group",
  transactionAmount: "font-bold text-[#F97316]",
  transactionIcon: "lg:p-3 md:p-3 p-2 rounded-lg bg-[rgba(255,255,255,0.02)]",

};

export const profileStyles = {
  // Container styles
  container: "max-w-4xl mx-auto py-8 px-4",
  mainContainer: "bg-white -mx-7 rounded-2xl shadow-sm overflow-hidden",
  
  // Header styles
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-8 text-center",
  avatar: "w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  userName: "text-2xl font-bold text-white",
  userEmail: "text-teal-100 mt-2",
  
  // Content styles
  content: "p-8 -mx-6.5",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
  
  // Card styles
  card: "bg-gray-50 rounded-xl p-6",
  cardTitle: "text-xl font-semibold pb-3 text-gray-800 flex items-center",
  icon: "w-5 h-5 mr-2 text-teal-600",
  
  // Form styles
  label: "text-sm text-gray-500  block mb-1",
  input: "w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  inputWithError: "w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  
  // Button styles
  buttonPrimary: "flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-2.5 rounded-xl font-medium shadow-md",
  buttonSecondary: "flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100",
  editButton: "text-teal-600 hover:text-teal-700 font-medium text-sm",
  changeButton: "text-teal-600 hover:text-teal-700 font-medium lg:text-sm",
  
  // Security item
  securityItem: "flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200",
  securityText: "font-medium lg:text-sm text-gray-400",
  
  // Modal styles
  modalContent: "bg-white rounded-2xl p-6 lg:px-28 w-full max-w-md",
  modalHeader: "flex justify-between lg:whitespace-nowrap lg:space-x-20 mb-6",
  modalTitle: "text-xl font-bold lg:pl-10 text-gray-800",
  
  // Password input
  passwordLabel: "block text-sm font-medium text-gray-700 mb-1",
  passwordContainer: "relative",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
  
  // Error text
  errorText: "mt-1 text-sm text-red-600"
};

// Add to existing dummyStyles.js
export const modalStyles = {
  // Modal container
  overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modalContainer: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl",
  
  // Header
  modalHeader: "flex justify-between items-center mb-4",
  modalTitle: "text-xl font-bold text-gray-800",
  closeButton: "text-gray-500 hover:text-gray-800",
  
  // Form elements
  form: "space-y-4",
  label: "block text-sm font-medium text-gray-700 mb-1",
  input: (ringColor) => `w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${ringColor}`,
  
  // Type buttons
  typeButtonContainer: "flex gap-4",
  typeButton: (isSelected, color) => 
    `flex-1 py-2 rounded-lg font-medium ${
      isSelected 
        ? `${color} text-white shadow-md` 
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }`,
  
  // Submit button
  submitButton: (color) => `w-full text-white py-3 rounded-lg font-medium mt-4 shadow-md hover:shadow-lg transition-all ${color}`,
  
  // Color classes
  colorClasses: {
    teal: {
      button: "bg-teal-500 hover:bg-teal-600",
      ring: "focus:ring-teal-500",
      typeButtonSelected: "bg-teal-500",
    },
    orange: {
      button: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
      ring: "focus:ring-orange-500",
      typeButtonSelected: "bg-orange-500",
    },
  },
};



// In src/assets/dummyStyles.js - add these styles
export const loginStyles = {
  // Page container
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-violet-50",
  
  // Card container
  cardContainer: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",
  
  // Header styles
  header: "bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-center",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-indigo-100 mt-2",
  
  // Form container
  formContainer: "p-8",
  
  // Error message
  errorContainer: "mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center",
  errorIcon: "w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3",
  errorText: "break-words",
  
  // Form elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
  input: "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
  
  // Checkbox
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500",
  checkboxLabel: "ml-2 block text-sm text-gray-700",
  
  // Button
  button: "w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center",
  buttonDisabled: "opacity-80 cursor-not-allowed",
  
  // Sign up link
  signUpContainer: "mt-8 text-center",
  signUpText: "text-gray-600",
  signUpLink: "font-medium text-indigo-600 hover:underline",
  
  // Spinner for loading state
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};

// Styles for Navbar component
export const navbarStyles = {
  // Layout and container styles (modern dark SaaS)
  header: 'sticky top-0 z-50 bg-gradient-to-b from-[#071126] via-[#081422] to-[#071126] border-b border-white/6 shadow-[0_8px_30px_rgba(2,6,23,0.65)]',
  container: 'flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto',

  // Logo styles
  logoContainer: 'flex items-center gap-3 cursor-pointer',
  logoImage: 'w-28 h-8 md:w-32 md:h-10 rounded-md overflow-hidden flex items-center justify-center',

  // Text styles (clear, bold brand)
  logoText: 'lg:text-2xl md:text-xl text-lg text-white font-extrabold tracking-tight',

  // User profile styles
  userContainer: 'relative',
  userButton: 'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors',
  userAvatar: `w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[${COLORS.primary}] to-[${COLORS.accent}] text-white font-semibold text-sm shadow-sm`,
  statusIndicator: 'absolute -bottom-1 -right-1 w-3 h-3 bg-[#34D399] rounded-full border-2 border-[#071126]',
  userTextContainer: 'text-left hidden md:block',
  userName: 'text-sm font-medium text-white truncate max-w-[140px]',
  userEmail: 'text-xs text-slate-300 truncate max-w-[140px]',
  chevronIcon: (isOpen) => `w-4 h-4 text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`,

  // Dropdown menu styles (glass + soft shadow)
  dropdownMenu: 'absolute top-14 right-0 w-64 bg-[rgba(255,255,255,0.03)] border border-white/8 rounded-xl shadow-[0_14px_40px_rgba(2,6,23,0.6)] backdrop-blur-sm z-50',
  dropdownHeader: 'px-4 py-3 border-b border-white/8',
  dropdownAvatar: `w-10 h-10 rounded-full bg-gradient-to-br from-[${COLORS.primary}] to-[${COLORS.accent}] flex items-center justify-center text-white font-semibold text-lg`,
  dropdownName: 'text-sm text-white',
  dropdownEmail: 'text-xs text-slate-300',

  // Menu items
  menuItemContainer: 'p-1.5',
  menuItem: 'w-full px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] text-sm text-slate-200 flex items-center gap-3 rounded-lg transition-colors',
  menuItemBorder: 'p-1.5 border-t border-white/8',
  logoutButton: 'flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(255,0,0,0.04)] text-red-400 rounded-lg transition-colors',
};


// In src/assets/dummyStyles.js - add these styles
export const signupStyles = {
  // Page container (reusing from login)
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50",
  
  // Card container (reusing from login)
  cardContainer: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",
  
  // Header styles (reusing from login with additions)
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center relative",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-teal-100 mt-2",
  backButton: "absolute top-4 left-4 p-2 text-white rounded-full hover:bg-white/10 transition-colors",
  
  // Form container (reusing from login)
  formContainer: "p-8",
  
  // Error messages
  apiError: "mb-4 text-center text-sm text-red-600",
  fieldError: "mt-1 text-sm text-red-600",
  
  // Form elements (reusing from login with additions)
  label: "block text-sm font-medium text-gray-700 mb-2",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
  input: "w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
  
  // Checkbox (reusing from login)
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500",
  checkboxLabel: "ml-2 block text-sm text-gray-700",
  
  // Button (reusing from login)
  button: "w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center",
  buttonDisabled: "opacity-80 cursor-not-allowed",
  
  // Sign in link (reusing from login with modifications)
  signInContainer: "mt-8 text-center",
  signInText: "text-gray-600",
  signInLink: "font-medium text-teal-600 hover:underline",
  
  // Spinner for loading state (reusing from login)
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};

export const transactionItemStyles = {
  // Container styles
  container: (isEditing, classes) => 
    `flex flex-col md:flex-row items-stretch justify-between gap-3 p-4 rounded-xl border border-gray-100 mb-3 last:mb-0 ${isEditing ? classes.bg : "hover:bg-gray-50"}`,
  
  // Layout styles
  mainContainer: "flex items-center gap-3 flex-1 min-w-0",
  actionsContainer: "flex items-center justify-between gap-3 mt-2 md:mt-0",
  amountContainer: "min-w-[100px] flex-shrink-0 flex justify-end",
  buttonsContainer: "flex gap-1 flex-shrink-0",
  
  // Icon styles
  iconContainer: (iconClass, classes) => `${iconClass} ${classes.iconBg}`,
  
  // Content styles
  contentContainer: "min-w-0 flex-1",
  description: "font-medium text-gray-800 truncate",
  details: "text-xs text-gray-500 mt-1 truncate",
  
  // Input styles
  input: (hasError, classes) => 
    `w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 ${hasError ? "border-red-500 ring-red-500" : `${classes.border} ${classes.ring}`}`,
  amountInput: (hasError, classes) => 
    `w-full max-w-[120px] bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 ${hasError ? "border-red-500 ring-red-500" : `${classes.border} ${classes.ring}`}`,
  
  // Error styles
  errorText: "text-xs text-red-600 mt-1",
  
  // Amount display
  amountText: (amountClass, classes) => `${amountClass} ${classes.text}`,
  
  // Button styles
  saveButton: (classes) => `p-2 ${classes.button} rounded-lg`,
  cancelButton: "p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400",
  editButton: (classes) => `p-2 ${classes.text} rounded-lg hover:${classes.bg}`,
  deleteButton: (classes) => `p-2 ${classes.text} rounded-lg hover:${classes.bg}`
};

// Centralized styles for the application
export const sidebarStyles = {
  // Layout and container styles
  sidebarContainer: {
    base: "hidden lg:flex flex-col pt-3 fixed top-16 bottom-0 z-30"
  },
  
  sidebarInner: {
    base: "bg-white border-r  border-gray-200 shadow-md h-full flex flex-col"
  },
  
  // User profile section
  userProfileContainer: {
    base: "p-4 border-b pt-20 md:pt-5 lg:pt-5 xl:pt-5 border-gray-100",
    collapsed: "px-3",
    expanded: "px-6"
  },
  
  userInitials: {
    base: "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl"
  },
  
  // Menu items
  menuList: {
    base: "space-y-1 px-2"
  },
  
  menuItem: {
    base: "relative flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200",
    active: "text-teal-600 bg-teal-50",
    inactive: "text-gray-600 hover:text-teal-700 hover:bg-gray-50",
    collapsed: "justify-center px-0 mx-2",
    expanded: "px-4"
  },
  
  menuIcon: {
    active: "text-teal-600",
    inactive: "text-gray-500"
  },
  
  activeIndicator: "absolute right-4 w-2 h-2 bg-teal-400 rounded-full animate-ping",
  
  // Toggle button
  toggleButton: {
    base: "absolute -right-3 top-12 z-20 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all"
  },
  
  // Footer section
  footerContainer: {
    base: "border-t border-gray-100 p-4",
    collapsed: "px-3",
    expanded: "px-6"
  },
  
  footerLink: {
    base: "flex items-center gap-3 py-2 rounded-xl font-medium text-gray-600 hover:text-teal-700 hover:bg-gray-50",
    collapsed: "justify-center"
  },
  
  logoutButton: {
    base: "flex items-center gap-3 py-2 rounded-xl font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 w-full mt-1",
    collapsed: "justify-center"
  },
  
  // Mobile sidebar
  mobileOverlay: "fixed inset-0 z-40 lg:hidden",
  mobileBackdrop: "absolute inset-0 bg-black/30 backdrop-blur-sm",
  
  mobileSidebar: {
    base: "absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl rounded-r-2xl overflow-hidden"
  },
  
  mobileHeader: "p-6 flex justify-between items-center border-b border-gray-100",
  mobileUserContainer: "flex pt-28 items-center gap-3",
  mobileCloseButton: "p-2 rounded-lg hover:bg-gray-100",
  
  mobileMenuList: "space-y-1",
  mobileMenuItem: {
    base: "flex items-center gap-4 px-6 py-4 font-medium",
    active: "text-teal-600 bg-teal-50",
    inactive: "text-gray-600 hover:bg-gray-50"
  },
  
  mobileFooter: "border-t border-gray-100 p-6",
  mobileFooterLink: "flex items-center gap-4 py-2 font-medium text-gray-600 hover:text-teal-700",
  mobileLogoutButton: "flex items-center gap-4 py-2 font-medium text-gray-600 hover:text-red-600 w-full",
  
  // Mobile menu button
  mobileMenuButton: "lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-full flex items-center justify-center shadow-xl"
};

// Helper function to combine class names
export const cn = (...classes) => classes.filter(Boolean).join(" ");

// assets/dummyStyles.js

export const styles = {
  // Layout and Container Styles
  layout: {
    root: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100",
    mainContainer: (sidebarCollapsed) => 
      `p-4 pt-6 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`,
  },

  // Header Styles
  header: {
    container: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
    title: "text-2xl font-bold text-white",
    subtitle: "text-slate-300",
  },

  // Stat Card Styles
  statCards: {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6",
    card: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100",
    cardHeader: "flex justify-between items-start",
    cardTitle: "text-sm text-gray-600",
    cardValue: "text-2xl font-bold text-gray-800 mt-1",
    iconContainer: (color) => `bg-${color}-100 p-2 rounded-lg`,
    icon: (color) => `w-5 h-5 text-${color}-600`,
    cardFooter: "text-xs text-gray-500 mt-3",
  },

  // Grid Layout
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    leftColumn: "lg:col-span-2 space-y-6",
    rightColumn: "lg:col-span-1 lg:-mx-3 space-y-6",
  },

  // Card Styles
  cards: {
    base: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
    header: "flex justify-between items-center mb-6",
    title: "text-xl font-bold text-gray-800 flex items-center gap-3",
    titleIcon: "w-6 h-6",
  },

  // Recent Transactions Card
  transactions: {
    cardHeader: "flex justify-between items-center mb-4",
    cardTitle: "text-md md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800 flex items-center gap-3",
    refreshButton: "p-2 rounded-lg hover:bg-gray-100 transition-colors",
    refreshIcon: (loading) => `w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`,
    dataStackingInfo: "flex items-center gap-2 text-xs text-gray-500 mb-4 bg-blue-50 p-2 rounded-lg",
    dataStackingIcon: "w-4 h-4 text-blue-500",
    listContainer: "space-y-4 max-h-[500px] -mx-5 overflow-y-auto pr-2",
    transactionItem: "flex items-center lg:flex-col xl:flex-row md:flex-row justify-between p-1 -mx-0 lg:p-4 md:p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-100",
    iconWrapper: (type) => type === 'income' ? 'bg-teal-100 text-teal-600' : 'bg-orange-100 text-orange-600',
    icon: "w-4 h-4",
    details: "min-w-0",
    description: "font-medium text-gray-800 truncate max-w-[120px]",
    meta: "text-xs text-gray-500 mt-1",
    amount: (type) => `font-semibold ${type === 'income' ? 'text-teal-600' : 'text-orange-600'}`,
    emptyState: "text-center py-8",
    emptyIconContainer: "w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center",
    emptyIcon: "w-8 h-8 text-purple-500",
    emptyText: "text-gray-600 font-medium",
    viewAllContainer: "pt-4 border-t border-gray-100",
    viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-teal-600 font-medium hover:bg-teal-50 rounded-xl transition-colors",
  },

  // Spending by Category Card
  categories: {
    title: "text-lg md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800 mb-6 flex items-center gap-3",
    titleIcon: "w-6 h-6 text-cyan-500",
    list: "space-y-4",
    categoryItem: "flex items-center md:text-lg lg:text-sm xl:text-lg justify-between",
    categoryIconContainer: "bg-gray-100 p-2 rounded-lg",
    categoryIcon: "w-4 h-4 text-gray-600",
    categoryName: "font-medium text-gray-700",
    categoryAmount: "font-semibold text-gray-800",
    summaryContainer: "mt-6 pt-6 border-t border-gray-100",
    summaryGrid: "grid grid-cols-2 gap-4",
    summaryIncomeCard: "bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4",
    summaryExpenseCard: "bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4",
    summaryTitle: "text-sm text-gray-600",
    summaryValue: "text-sm font-bold text-gray-800",
  },

  // Color Helpers
  colors: {
    transaction: {
      text: (type) => type === 'income' ? 'text-teal-600' : 'text-orange-600',
      bg: (type) => type === 'income' ? 'bg-teal-100 text-teal-600' : 'bg-orange-100 text-orange-600',
    },
    expenseChange: (change) => change > 0 ? 'text-orange-600' : 'text-green-600',
  },
};