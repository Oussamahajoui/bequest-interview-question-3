# Tamper Proof Data System

## Solution by Oussama H.

Thank you for reviewing my implementation of the Bequest technical challenge. I've developed a robust solution that addresses the core requirements of maintaining data integrity and providing recovery mechanisms. Below, I'll walk you through my approach and implementation.

## Challenge Overview

At Bequest, maintaining tamper-proof user data is crucial to prevent incorrect asset distribution in case of server or database breaches. This implementation provides a comprehensive solution to:

1. Ensure data integrity
2. Detect tampering
3. Enable secure data recovery

## Implementation Overview

I've built this system using modern web technologies and security practices:

- Frontend: React with TypeScript
- Backend: Express.js
- Data Security: CryptoJS for SHA-256 hashing
- State Management: React Hooks

### 1. How does the client ensure that their data has not been tampered with?

The system implements multiple layers of data integrity verification:

a) **Hash-based Verification**:

- Each data record includes a SHA-256 hash generated from the content and timestamp
- The client can verify data integrity by:
  - Recalculating the hash of current data
  - Comparing it with the stored hash
  - Visual indicator shows if data is valid (green) or tampered (red)

b) **Timestamp Tracking**:

- Each modification is timestamped
- Timestamps are included in hash calculation
- Prevents replay attacks and ensures data freshness

### 2. If the data has been tampered with, how can the client recover the lost data?

The system provides multiple recovery mechanisms:

a) **Version History**:

- Every data modification is stored in a history log
- Each version includes:
  - Content
  - Timestamp
  - Hash for verification
- Users can:
  - View complete modification history
  - Verify each historical version
  - Restore any previous version

b) **Restore Functionality**:

- One-click restoration of any historical version
- Automatic hash verification of restored data
- Maintains integrity of restored data

## Key Features

1. **Real-time Verification**:

   - Immediate feedback on data integrity
   - Visual indicators for valid/invalid states

2. **User-friendly Interface**:

   - Clean, intuitive design
   - Clear status indicators
   - Easy-to-use history management

3. **Secure Implementation**:

   - Cryptographic hash verification
   - Immutable history records
   - Timestamp-based versioning

4. **Data Recovery**:
   - Complete version history
   - One-click restoration
   - Verified recovery process

## Technical Implementation

The system uses:

- CryptoJS for SHA-256 hash generation
- Express.js for RESTful API endpoints
- React for responsive UI
- TypeScript for type safety
- CSS for modern, responsive design

### To run the apps:

`npm run start` in both the frontend and backend

## To make a submission:

1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
