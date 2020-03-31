import request from '@/utils/request';

export async function getAuth() {
  return request(`/kingbee-user/auth`, {
    method: 'GET',
  });
}
