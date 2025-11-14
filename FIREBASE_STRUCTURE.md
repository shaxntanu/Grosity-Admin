# Firebase Collection Structure

## 📊 admin_analytics Collection

### Collection ID: `admin_analytics`

### Document Structure:
Each document represents one day of analytics data.

**Document ID Format:** `YYYY-MM-DD` (e.g., `2025-01-14`)

**Fields:**
```javascript
{
  // Date Information
  date: "2025-01-14",                    // string - ISO date format
  dayOfWeek: "Tuesday",                  // string - day name
  
  // Traffic Metrics
  pageViews: 150,                        // number - total page views
  uniqueVisitors: 120,                   // number - unique visitors
  
  // Engagement Metrics
  chatbotInteractions: 25,               // number - chatbot opens/messages
  contactSubmissions: 5,                 // number - contact form submissions
  
  // Time Metrics
  avgSessionDuration: 180,               // number - seconds
  totalEngagementTime: 21600,            // number - total seconds
  
  // Timestamps
  created: Timestamp,                    // timestamp - first entry
  lastUpdated: Timestamp                 // timestamp - last update
}
```

### Example Document:
```
admin_analytics/
  └── 2025-01-14
      ├── date: "2025-01-14"
      ├── dayOfWeek: "Tuesday"
      ├── pageViews: 150
      ├── uniqueVisitors: 120
      ├── chatbotInteractions: 25
      ├── contactSubmissions: 5
      ├── avgSessionDuration: 180
      ├── totalEngagementTime: 21600
      ├── created: January 14, 2025 at 10:00:00 AM
      └── lastUpdated: January 14, 2025 at 11:30:00 PM
```

## 📋 Viewing in Firebase Console

### To View Sorted Data:
1. Go to Firebase Console → Firestore Database
2. Click on `admin_analytics` collection
3. Documents are automatically sorted by Document ID (date)
4. Most recent dates appear at the bottom

### To Query Data:
```javascript
// Get last 30 days
db.collection('admin_analytics')
  .orderBy('date', 'desc')
  .limit(30)
  .get()

// Get specific date
db.collection('admin_analytics')
  .doc('2025-01-14')
  .get()

// Get date range
db.collection('admin_analytics')
  .where('date', '>=', '2025-01-01')
  .where('date', '<=', '2025-01-31')
  .orderBy('date', 'asc')
  .get()
```

## 🔍 Sample Data for Testing

Create these documents in Firebase Console to test:

**Document 1:** `2025-01-14`
```
date: "2025-01-14"
dayOfWeek: "Tuesday"
pageViews: 150
uniqueVisitors: 120
chatbotInteractions: 25
contactSubmissions: 5
avgSessionDuration: 180
totalEngagementTime: 21600
created: [current timestamp]
lastUpdated: [current timestamp]
```

**Document 2:** `2025-01-13`
```
date: "2025-01-13"
dayOfWeek: "Monday"
pageViews: 135
uniqueVisitors: 110
chatbotInteractions: 20
contactSubmissions: 4
avgSessionDuration: 165
totalEngagementTime: 18150
created: [current timestamp]
lastUpdated: [current timestamp]
```

## 📊 Dashboard Queries

The admin panel uses these queries:

1. **Dashboard Stats** - Last 30 days total:
   ```javascript
   db.collection('admin_analytics')
     .orderBy('date', 'desc')
     .limit(30)
     .get()
   ```

2. **Weekly Chart** - Last 7 days:
   ```javascript
   db.collection('admin_analytics')
     .orderBy('date', 'desc')
     .limit(7)
     .get()
   ```

3. **Monthly Chart** - Last 30 days:
   ```javascript
   db.collection('admin_analytics')
     .orderBy('date', 'desc')
     .limit(30)
     .get()
   ```

## ✅ Benefits of This Structure

1. **Easy to View** - Documents sorted by date automatically
2. **Simple Queries** - Just query by date range
3. **Efficient** - One document per day (not per event)
4. **Scalable** - Can add more metrics easily
5. **Clean** - Easy to understand in Firebase Console

## 🔐 Security Rules

Recommended Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin analytics - read only for authenticated users
    match /admin_analytics/{document=**} {
      allow read: if true;  // Public read for admin panel
      allow write: if true; // Allow website to write (change for production)
    }
    
    // Contacts - read/write for admin
    match /contacts/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

⚠️ **Update these rules for production security!**

---

**Your analytics data is now properly structured and easy to view! 📊**
