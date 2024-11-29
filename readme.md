# React Native Tech Test

👋

## Setup

This is a standard React Native project. You will need to set up the project locally to run and debug it. Please ensure you have the necessary tools installed (e.g., Node.js, npm/yarn, React Native CLI, and platform-specific dependencies such as Xcode or Android Studio).

If you encounter any issues during the setup, feel free to reach out for assistance.

## Overview

This is a basic React Native app that allows users to manage their accounts. The app includes the following key features:

- **Auth: Login and Logout**: Users can log in and log out of their accounts.
- **Account Creation**: After logging in, users can create new accounts.
- **Balance Breakdown**: Users can view a detailed breakdown of their account balance.

Your task is to enhance this app by implementing the requested features as described below.

### Task 1: Auth Implementation

Our current auth works like this:

- We call a `login` endpoint to authenticate the user.
- The user data returned is saved directly to Redux.
- We logout by removing the FE state.

**Question:**  
Do you agree with the auth-on-redux approach?  
If not, or if you see any areas for improvement, please make the necessary changes.

### Task 2: Async Account Creation

Our current account creation works like this:

- We make a synchronous API call to create an account.
- The app does not wait for the account status to become `"completed"` and gives the user no feedback at all.

**Question:**

- How would you improve this process to ensure the app waits until the account is created with a nicer UX?
- If you notice any areas for improvement, please make the necessary changes.

  **Note:**
  If account is in the "pending" state, then is a false flag. this just means the async process isn't done it, so no account exists yet.

### Task 3: Account Breakdown

We have an account balance breakdown with the following components:

1. **Interest**: The interest earned on the account balance.  
   This should represent the monthly interest.

2. **Fees**: The fees deducted from the account.  
   Ensure the fee percentage used is reasonable.

3. **Taxes**: The taxes applied to the account balance.  
   taxes are applied to the net balance after fees.

4. **Available Balance**: The remaining balance after deducting fees and taxes, and adding any interest.

**Question:** Is the current implementation correct? If not, or if you notice any areas for improvement, please make the necessary changes.

Let us know if you have any questions/updates!
