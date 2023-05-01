import { useState, useEffect } from 'react';
import { useServer } from '../libs/server';
const HandleUser = () => {
  const { getAccount } = useServer();
  const user = getAccount((error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      return response;
    }
  });
  return { user };
};
export default HandleUser;
