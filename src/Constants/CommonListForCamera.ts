export interface PicOptionType {
  id: number;
  label: string;
  color: string;
  icon: string;
}

export const picOptions: PicOptionType[] = [
  {
    id: 1,
    label: 'Take Image',
    color: 'black',
    icon: 'camera',
  },
  // {
  //   id: 2,
  //   label: 'Upload File',
  //   color: 'black',
  //   icon: 'upload',
  // },
  {
    id: 3,
    label: 'Cancel',
    color: 'black',
    icon: 'closecircle',
  },
];
