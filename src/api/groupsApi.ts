import type GroupInterface from '@/types/GroupInterface';

export const getGroupsApi = async (): Promise<GroupInterface[]> => {
  try {
    const base = process.env.NEXT_PUBLIC_API ?? '/api/';
    const response = await fetch(`${base}groups`);
    const groups = await response.json() as GroupInterface[];
    return groups;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as GroupInterface[];
  }
};
