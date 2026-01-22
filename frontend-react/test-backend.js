// Test script to verify backend API endpoints
const axios = require('axios');

async function testAPIEndpoints() {
  const baseURL = 'http://localhost:5000/api';
  
  console.log('Testing CircuitSentry backend API endpoints...\n');
  
  try {
    // Test get-filters endpoint
    console.log('1. Testing /get-filters endpoint...');
    const filtersResponse = await axios.get(`${baseURL}/get-filters`);
    console.log(`   ✅ Success: Retrieved ${filtersResponse.data.filters.length} filters\n`);
    
    // Test realtime filters endpoint
    console.log('2. Testing /realtime/filters endpoint...');
    const realtimeFiltersResponse = await axios.get(`${baseURL}/realtime/filters`);
    console.log(`   ✅ Success: Retrieved ${realtimeFiltersResponse.data.filters.length} realtime filters\n`);
    
    console.log('All API endpoints are accessible and returning expected data.');
    console.log('The React frontend should be able to communicate with the backend successfully.');
    
  } catch (error) {
    console.error('❌ Error testing API endpoints:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the test
testAPIEndpoints();