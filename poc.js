import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: `${__ENV.STEP_UM || '1m'}`, target: __ENV.USUARIOS_STEP_UM || 100 },
    { duration: `${__ENV.STEP_DOIS || '2m'}`, target: __ENV.USUARIOS_STEP_DOIS || 500 }, 
    { duration: `${__ENV.STEP_TRES || '2m'}`, target: 0 }, 
  ],
};

export default function () {
  const response = http.get('http://localhost:3000/estados');
  check(response, { 'status é 200': (res) => res.status === 200 });

  sleep(0.25); 
}

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  return {
      './report.json': JSON.stringify(data),
  }
}