interface GroupInterface {
  id: number;
  name: string;
  contacts?: string;
  students?: import('./StudentInterface').default[];
};

export default GroupInterface;
