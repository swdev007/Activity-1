import React, {useState} from 'react';
export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('lock');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'lock') {
      setRightIcon('lock-open');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'lock-open') {
      setRightIcon('lock');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export const useTogglePasswordVisibility2 = () => {
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [rightIcon2, setRightIcon2] = useState('lock');
  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === 'lock') {
      setRightIcon2('lock-open');
      setPasswordVisibility2(!passwordVisibility2);
    } else if (rightIcon2 === 'lock-open') {
      setRightIcon2('lock');
      setPasswordVisibility2(!passwordVisibility2);
    }
  };

  return {
    passwordVisibility2,
    rightIcon2,
    handlePasswordVisibility2,
  };
};
