# React Native Tech Test

### Task 1: Auth Implementation

**Separation of Concerns**
- Created a dedicated authService to handle authentication logic instead of directly managing it in Redux
- Implemented proper token management and storage
- Added type safety with proper interfaces for auth-related data

**Secure Storage**
- Moved away from storing sensitive data directly in Redux
- Utilized react-native-mmkv for secure storage of tokens and user data
- Added token expiration checking

**Improved State Management**
- Redux now only maintains the authentication state (isLoggedIn, isLoading, error)
- Added proper action types and reducers for auth flow

**Persistent Authentication**
- Added automatic auth state restoration on app launch
- Implemented proper token refresh flow
- Added logout functionality that properly cleans up auth state

### Task 2: Async Account Creation

**Asynchronous Account Status Checking**
- Implemented a polling mechanism to check account status
- Added proper status handling for "pending" and "completed" states
- Introduced timeout protection to prevent infinite polling

**User Experience Improvements**
- Added loading state feedback during account creation
- Implemented error handling for failed account creation attempts
- Clear status messaging throughout the process

**Futher possible improvements not included**
- Consider implementing webhook callbacks for account status updates
- Add retry mechanism for failed API calls
- Implement progressive backoff for polling intervals

### Task 3: Account Breakdown

**Calculate components in the correct order:**
- First calculate interest (as it's based on the initial balance)
- Then calculate and deduct fees
- Then calculate taxes on the net amount after fees
- Finally calculate the available balance

**Ensure the calculations follow this formula:**
- Available Balance = Initial Balance + Interest - Fees - Taxes

