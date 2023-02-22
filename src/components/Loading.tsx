

import LoadingOverlay, { LoadingOverlayProps } from 'react-loading-overlay';

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  text: string;
}

const Loading: React.FC<LoadingButtonProps> = ({ isLoading, children , text}) => {




  const overlayProps: LoadingOverlayProps = {
    active: isLoading,
    spinner: true,
    text: text,
  };

  return (
    <LoadingOverlay {...overlayProps}>
        {children}
    </LoadingOverlay>
  );
};

export default Loading;