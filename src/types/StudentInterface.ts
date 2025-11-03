interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isDeleted?: boolean;
  groupId?: number;
  contacts: string;
  group?: import('./GroupInterface').default | null;
};

export default StudentInterface;
