import * as SecureStore from 'expo-secure-store';
const API_BASE_URL = 'https://university-internship-management-sy.vercel.app';

// POST requests: Login, Register වැනි දේවල් සඳහා
export async function apiRequest(
  endpoint: string,
  body: object
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// GET requests: Internships ලබාගැනීම සඳහා
export async function apiGet(endpoint: string) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function apiPostProtected(
  endpoint: string,
  body: object = {}
) {
  const token = await SecureStore.getItemAsync('token');

  if (!token) {
    throw new Error('Please login first.');
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function apiGetProtected(endpoint: string) {
  const token = await SecureStore.getItemAsync('token');

  if (!token) {
    throw new Error('Please login first.');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}


export async function apiPutProtected(
  endpoint: string,
  body: object
) {
  const token = await SecureStore.getItemAsync('token');

  if (!token) {
    throw new Error('Please login first.');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Update failed');
  }

  return data;
}

