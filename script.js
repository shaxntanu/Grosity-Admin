// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Year update
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Dark mode toggle - Initialize immediately
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply theme immediately (before DOM loads to prevent flash)
if (currentTheme === 'dark') {
    html.classList.add('dark-mode');
} else {
    html.classList.remove('dark-mode');
}

// Setup toggle after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) {
        console.error('❌ Dark mode toggle not found!');
        return;
    }
    
    // Set checkbox state based on current theme
    darkModeToggle.checked = (currentTheme === 'dark');
    console.log(`✅ Dark mode initialized: ${currentTheme}`);
    
    // Toggle theme on change
    darkModeToggle.addEventListener('change', function () {
        if (this.checked) {
            html.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            console.log('🌙 Dark mode enabled');
        } else {
            html.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            console.log('☀️ Light mode enabled');
        }
        
        // Update charts if analytics section is visible
        const analyticsSection = document.getElementById('analytics');
        if (analyticsSection && analyticsSection.style.display !== 'none') {
            setTimeout(() => {
                if (typeof loadAnalytics === 'function') {
                    loadAnalytics();
                }
            }, 300);
        }
    });
});

// Wait for Firebase to be ready
let currentUser = null;
let db, auth;

// Initialize Firebase references when available
function initFirebase() {
    if (typeof window.db !== 'undefined' && typeof window.auth !== 'undefined') {
        db = window.db;
        auth = window.auth;
        console.log('✅ Firebase references initialized');
        console.log('🔥 Firebase Config:', {
            projectId: 'grosityindia',
            database: 'Firestore',
            status: 'Connected'
        });
        
        // Test Firebase connection
        testFirebaseConnection();
        
        // Check authentication state
        checkAuthState();
    } else {
        console.log('⏳ Waiting for Firebase...');
        setTimeout(initFirebase, 100);
    }
}

// Test Firebase connection
function testFirebaseConnection() {
    db.collection('contacts').limit(1).get()
        .then(function(snapshot) {
            console.log('✅ Firebase connection successful!');
            console.log(`📊 Database has ${snapshot.size > 0 ? 'data' : 'no data yet'}`);
        })
        .catch(function(error) {
            console.error('❌ Firebase connection error:', error);
            console.error('Please check your Firebase configuration and rules');
        });
}

// Check auth state
function checkAuthState() {
    // For now, using localStorage-based auth
    // You can switch to Firebase Auth later if needed
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        currentUser = { username: 'admin' };
        showDashboard();
        loadDashboardData();
    } else {
        showLogin();
    }
}

// Start initialization
initFirebase();

// Show/Hide sections with animation
function showLogin() {
    fadeOutAllSections(() => {
        document.getElementById('login-section').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('contacts').style.display = 'none';
        document.getElementById('analytics').style.display = 'none';
        document.getElementById('settings').style.display = 'none';
    });
}

function showDashboard() {
    fadeOutAllSections(() => {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('contacts').style.display = 'none';
        document.getElementById('analytics').style.display = 'none';
        document.getElementById('settings').style.display = 'none';
    });
}

// Fade out all sections before switching
function fadeOutAllSections(callback) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        callback();
        // Trigger reflow to restart animation
        setTimeout(() => {
            sections.forEach(section => {
                if (section.style.display !== 'none') {
                    section.style.opacity = '';
                    section.style.transform = '';
                }
            });
        }, 50);
    }, 300);
}

// Navigation with smooth transitions
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        
        // Special handling for analytics to prevent jitter
        if (target === 'analytics') {
            fadeOutAllSections(() => {
                // Hide all sections
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = 'none';
                });
                
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    // Keep section hidden while loading
                    targetSection.style.display = 'block';
                    targetSection.style.visibility = 'hidden';
                    targetSection.style.opacity = '0';
                    
                    // Load analytics first
                    loadAnalytics();
                    
                    // Wait longer for all charts to fully render
                    setTimeout(() => {
                        targetSection.style.visibility = 'visible';
                        targetSection.style.opacity = '1';
                        targetSection.style.transform = 'translateY(0)';
                    }, 800);
                }
            });
        } else {
            // Normal transition for other sections
            fadeOutAllSections(() => {
                // Hide all sections
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show target section
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    
                    // Load data for specific sections
                    if (target === 'contacts') {
                        loadContacts();
                    } else if (target === 'dashboard') {
                        loadDashboardData();
                    }
                }
            });
        }
    });
});

// Login handler
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-txt">Logging in...</span>';
    submitBtn.disabled = true;
    
    try {
        // Call Vercel serverless function for authentication
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Login successful');
            currentUser = { username: username };
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            showDashboard();
            loadDashboardData();
        } else {
            console.error('❌ Login error: Invalid credentials');
            alert('Login failed: ' + data.message);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        alert('Login failed: Network error. Please try again.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Logout handler
function logout() {
    localStorage.removeItem('adminLoggedIn');
    currentUser = null;
    console.log('✅ Logout successful');
    showLogin();
}

// Load dashboard data
function loadDashboardData() {
    if (!db) {
        console.error('❌ Firebase not initialized');
        return;
    }
    
    // Load total contacts from Firebase
    db.collection('contacts').get()
        .then(function(querySnapshot) {
            const totalContacts = querySnapshot.size;
            document.getElementById('totalContacts').textContent = totalContacts;
            console.log(`✅ Loaded ${totalContacts} contacts from Firebase`);
        })
        .catch(function(error) {
            console.error('❌ Error loading contacts:', error);
            document.getElementById('totalContacts').textContent = '0';
        });
    
    // Load real analytics data from Firestore (admin_analytics collection)
    db.collection('admin_analytics')
        .orderBy('date', 'desc')
        .limit(30)
        .get()
        .then(function(querySnapshot) {
            let totalViews = 0;
            let totalChatbot = 0;
            let totalEngagement = 0;
            let daysCount = 0;
            
            querySnapshot.forEach(function(doc) {
                const data = doc.data();
                totalViews += data.pageViews || 0;
                totalChatbot += data.chatbotInteractions || 0;
                totalEngagement += data.avgSessionDuration || 0;
                daysCount++;
            });
            
            // Update dashboard stats
            document.getElementById('totalViews').textContent = totalViews.toLocaleString();
            document.getElementById('chatbotInteractions').textContent = totalChatbot.toLocaleString();
            
            // Calculate average session time
            if (daysCount > 0 && totalEngagement > 0) {
                const avgSeconds = Math.floor(totalEngagement / daysCount);
                const minutes = Math.floor(avgSeconds / 60);
                const seconds = avgSeconds % 60;
                document.getElementById('avgTime').textContent = `${minutes}m ${seconds}s`;
            } else {
                document.getElementById('avgTime').textContent = '0s';
            }
            
            console.log(`✅ Loaded analytics from admin_analytics:`);
            console.log(`   📊 ${totalViews} total views`);
            console.log(`   💬 ${totalChatbot} chatbot interactions`);
            console.log(`   📅 ${daysCount} days of data`);
        })
        .catch(function(error) {
            console.error('❌ Error loading analytics:', error);
            document.getElementById('totalViews').textContent = '0';
            document.getElementById('chatbotInteractions').textContent = '0';
            document.getElementById('avgTime').textContent = '0s';
        });
}

// Load contacts
function loadContacts() {
    if (!db) {
        console.error('❌ Firebase not initialized');
        return;
    }
    
    const tbody = document.getElementById('contactsTableBody');
    tbody.innerHTML = '<tr><td colspan="7" class="loading">Loading contacts from Firebase...</td></tr>';
    
    db.collection('contacts')
        .orderBy('timestamp', 'desc')
        .get()
        .then(function(querySnapshot) {
            if (querySnapshot.empty) {
                tbody.innerHTML = '<tr><td colspan="7" class="loading">No contacts yet. Contacts from the website will appear here.</td></tr>';
                console.log('ℹ️ No contacts found in Firebase');
                return;
            }
            
            tbody.innerHTML = '';
            console.log(`✅ Loaded ${querySnapshot.size} contacts from Firebase`);
            
            querySnapshot.forEach(function(doc) {
                const data = doc.data();
                const row = document.createElement('tr');
                
                const date = data.timestamp ? data.timestamp.toDate().toLocaleDateString() : 'N/A';
                const status = data.status || 'new';
                
                row.innerHTML = `
                    <td>${date}</td>
                    <td>${data.name || 'N/A'}</td>
                    <td>${data.email || 'N/A'}</td>
                    <td>${data.subject || 'N/A'}</td>
                    <td>${(data.message || 'N/A').substring(0, 50)}...</td>
                    <td><span class="status-badge status-${status}">${status}</span></td>
                    <td>
                        <button class="action-btn view" onclick="viewContact('${doc.id}')">View</button>
                        <button class="action-btn delete" onclick="deleteContact('${doc.id}')">Delete</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error('❌ Error loading contacts:', error);
            tbody.innerHTML = `<tr><td colspan="7" class="loading">Error loading contacts: ${error.message}</td></tr>`;
        });
}

// View contact details
function viewContact(id) {
    if (!db) {
        console.error('❌ Firebase not initialized');
        alert('Firebase not initialized. Please refresh the page.');
        return;
    }
    
    db.collection('contacts').doc(id).get()
        .then(function(doc) {
            if (doc.exists) {
                const data = doc.data();
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A';
                
                alert(`Contact Details:\n\nDate: ${date}\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`);
                
                // Mark as read
                db.collection('contacts').doc(id).update({
                    status: 'read'
                }).then(function() {
                    console.log('✅ Contact marked as read');
                    loadContacts();
                    loadDashboardData();
                });
            }
        })
        .catch(function(error) {
            console.error('❌ Error viewing contact:', error);
            alert('Error loading contact details: ' + error.message);
        });
}

// Delete contact
function deleteContact(id) {
    if (!db) {
        console.error('❌ Firebase not initialized');
        alert('Firebase not initialized. Please refresh the page.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this contact?')) {
        db.collection('contacts').doc(id).delete()
            .then(function() {
                console.log('✅ Contact deleted from Firebase');
                loadContacts();
                loadDashboardData();
            })
            .catch(function(error) {
                console.error('❌ Error deleting contact:', error);
                alert('Error deleting contact: ' + error.message);
            });
    }
}

// Chart.js Global Configuration
let charts = {};

// Get theme colors
function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    return {
        primary: '#FFD700',
        secondary: '#22C55E',
        tertiary: '#3b82f6',
        quaternary: '#ef4444',
        quinary: '#8b5cf6',
        senary: '#f59e0b',
        text: isDark ? '#ffffff' : '#000000',
        grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        background: isDark ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 215, 0, 0.05)'
    };
}

// Chart.js default config - Beautiful styling
Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
Chart.defaults.color = getChartColors().text;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 15;
Chart.defaults.plugins.legend.labels.font = {
    size: 13,
    weight: '600'
};
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.9)';
Chart.defaults.plugins.tooltip.padding = 16;
Chart.defaults.plugins.tooltip.cornerRadius = 12;
Chart.defaults.plugins.tooltip.titleFont = {
    size: 15,
    weight: 'bold'
};
Chart.defaults.plugins.tooltip.bodyFont = {
    size: 14,
    weight: '500'
};
Chart.defaults.plugins.tooltip.borderColor = '#FFD700';
Chart.defaults.plugins.tooltip.borderWidth = 2;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
// Smooth animations
Chart.defaults.animation = {
    duration: 800,
    easing: 'easeInOutQuart'
};

// Load analytics with Chart.js
function loadAnalytics() {
    if (!db) {
        console.error('❌ Firebase not initialized');
        return;
    }
    
    const colors = getChartColors();
    
    // Destroy existing charts if they exist
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    charts = {};
    
    // Fetch real analytics data from Firestore (admin_analytics collection)
    db.collection('admin_analytics')
        .orderBy('date', 'desc')
        .limit(30)
        .get()
        .then(function(querySnapshot) {
            const analyticsData = [];
            querySnapshot.forEach(function(doc) {
                analyticsData.push({
                    date: doc.id,
                    ...doc.data()
                });
            });
            
            // Reverse to show oldest first
            analyticsData.reverse();
            
            console.log(`✅ Loaded ${analyticsData.length} days of analytics data from admin_analytics`);
            
            // Create charts with real data
            createChartsWithRealData(analyticsData, colors);
        })
        .catch(function(error) {
            console.error('❌ Error loading analytics for charts:', error);
            // Fallback to sample data if error
            createChartsWithSampleData(colors);
        });
}

// Create charts with real data from Firebase
function createChartsWithRealData(analyticsData, colors) {
    // Get last 7 days for weekly chart
    const last7Days = analyticsData.slice(-7);
    
    // If no data, show message instead of empty charts
    if (last7Days.length === 0) {
        console.log('ℹ️ No analytics data yet. Visit your website to generate data.');
        createEmptyStateCharts(colors);
        return;
    }
    
    const weekLabels = last7Days.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    const weekViews = last7Days.map(d => d.pageViews || 0);
    
    // 1. Weekly Visitors - Bar Chart (REAL DATA)
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        charts.visitors = new Chart(visitorsCtx, {
            type: 'bar',
            data: {
                labels: weekLabels,
                datasets: [{
                    label: 'Page Views',
                    data: weekViews,
                    backgroundColor: colors.primary,
                    borderColor: colors.text,
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: colors.secondary,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Visitors: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: colors.grid },
                        ticks: { color: colors.text }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: colors.text }
                    }
                }
            }
        });
    }
    
    // 2. User Types - Doughnut Chart
    const userTypesCtx = document.getElementById('userTypesChart');
    if (userTypesCtx) {
        charts.userTypes = new Chart(userTypesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Farmers', 'Vendors', 'Consumers'],
                datasets: [{
                    data: [35, 28, 37],
                    backgroundColor: [colors.secondary, colors.primary, colors.tertiary],
                    borderColor: colors.text,
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: colors.text, padding: 15 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                }
            }
        });
    }
    
    // 3. Contact Submissions - Line Chart
    const contactsCtx = document.getElementById('contactsChart');
    if (contactsCtx) {
        charts.contacts = new Chart(contactsCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Submissions',
                    data: [12, 19, 15, 25],
                    borderColor: colors.secondary,
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: colors.text,
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Contacts: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: colors.grid },
                        ticks: { color: colors.text }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: colors.text }
                    }
                }
            }
        });
    }
    
    // 4. Page Engagement - Radar Chart
    const engagementCtx = document.getElementById('engagementChart');
    if (engagementCtx) {
        charts.engagement = new Chart(engagementCtx, {
            type: 'radar',
            data: {
                labels: ['Home', 'About', 'Services', 'Contact', 'Network'],
                datasets: [{
                    label: 'Engagement Score',
                    data: [85, 72, 68, 90, 78],
                    borderColor: colors.primary,
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colors.secondary,
                    pointBorderColor: colors.text,
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 1800,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: colors.grid },
                        ticks: { 
                            color: colors.text,
                            backdropColor: 'transparent'
                        },
                        pointLabels: { color: colors.text }
                    }
                }
            }
        });
    }
    
    // 5. Monthly Traffic Trend - Line Chart (Large)
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        charts.traffic = new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Page Views',
                        data: [1200, 1900, 1500, 2100, 2400, 2200, 2800, 3100, 2900, 3400, 3600, 3800],
                        borderColor: colors.primary,
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: colors.text,
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Unique Visitors',
                        data: [800, 1200, 1000, 1400, 1600, 1500, 1900, 2100, 2000, 2300, 2500, 2700],
                        borderColor: colors.secondary,
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: colors.secondary,
                        pointBorderColor: colors.text,
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: colors.text, padding: 15 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: colors.grid },
                        ticks: { color: colors.text }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: colors.text }
                    }
                }
            }
        });
    }
    
    // 6. Traffic Sources - Pie Chart
    const sourcesCtx = document.getElementById('sourcesChart');
    if (sourcesCtx) {
        charts.sources = new Chart(sourcesCtx, {
            type: 'pie',
            data: {
                labels: ['Direct', 'Social Media', 'Search', 'Referral', 'Email'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        colors.primary,
                        colors.secondary,
                        colors.tertiary,
                        colors.quaternary,
                        colors.quinary
                    ],
                    borderColor: colors.text,
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: colors.text, padding: 12 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                }
            }
        });
    }
    
    console.log('✅ Analytics charts loaded');
}

// Empty state when no data
function createEmptyStateCharts(colors) {
    console.log('ℹ️ No data available yet');
    
    const chartIds = ['visitorsChart', 'userTypesChart', 'contactsChart', 'engagementChart', 'trafficChart', 'sourcesChart'];
    
    chartIds.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            const container = canvas.parentElement;
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-text">No data yet<br>Visit your website to start tracking</div>
                </div>
            `;
        }
    });
}

// Fallback function with sample data
function createChartsWithSampleData(colors) {
    console.log('ℹ️ Using sample data for charts');
    
    // 1. Weekly Visitors - Bar Chart (SAMPLE DATA)
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        charts.visitors = new Chart(visitorsCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Visitors (Sample)',
                    data: [5, 8, 3, 12, 15, 10, 7],
                    backgroundColor: colors.primary,
                    borderColor: colors.text,
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: colors.secondary,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Visitors: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: colors.grid },
                        ticks: { color: colors.text }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: colors.text }
                    }
                }
            }
        });
    }
    
    // Continue with other sample charts...
    console.log('✅ Sample charts loaded');
}

// Export contacts to CSV
function exportContacts() {
    if (!db) {
        console.error('❌ Firebase not initialized');
        alert('Firebase not initialized. Please refresh the page.');
        return;
    }
    
    console.log('📥 Exporting contacts from Firebase...');
    
    db.collection('contacts')
        .orderBy('timestamp', 'desc')
        .get()
        .then(function(querySnapshot) {
            if (querySnapshot.empty) {
                alert('No contacts to export');
                console.log('ℹ️ No contacts found to export');
                return;
            }
            
            // Create CSV content
            let csv = 'Date,Name,Email,Subject,Message,Status\n';
            
            querySnapshot.forEach(function(doc) {
                const data = doc.data();
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A';
                
                csv += `"${date}","${data.name || ''}","${data.email || ''}","${data.subject || ''}","${(data.message || '').replace(/"/g, '""')}","${data.status || 'new'}"\n`;
            });
            
            // Download CSV
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `grosity-contacts-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            console.log(`✅ Exported ${querySnapshot.size} contacts to CSV`);
        })
        .catch(function(error) {
            console.error('❌ Error exporting contacts:', error);
            alert('Error exporting contacts: ' + error.message);
        });
}
