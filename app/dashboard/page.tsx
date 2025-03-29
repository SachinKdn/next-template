import { testAPI } from '@/api/server';
import React from 'react'


export default async function Page() {
  const response = await testAPI();
  console.log('testAPI result', response);
  return <div>
    <h1>Dashboard</h1>
    <span>{response}</span>
  </div>;
}
