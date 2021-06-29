import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Popup } from '../../es/Popup';
import '../../es/Popup/style';

const App = () => {
  const [visible, setVisible] = useState(false);

  const togglePopup = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <>
      <button onClick={togglePopup}>Toggle Popup</button>
      <Popup
        width="70%"
        direction="bottom"
        visible={visible}
        onMaskClick={togglePopup}
        onShow={() => {
          console.log('show');
        }}
        onHide={() => {
          console.log('hide');
        }}
      >
        content <br />
        content <br />
        content <br />
        content <br />
        content <br />
      </Popup>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
