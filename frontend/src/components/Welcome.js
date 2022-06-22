import network from '../assets/network.jpg';
import { useTranslation } from 'react-i18next';

const Welcome = (props) => {
  const { t } = useTranslation();

  return (
    <div style={{ position: 'relative' }}>
      <img
        style={{
          maxWidth: '100%',
          maxHeight: '200%',
          height: 'auto',
          maxopacity: 0.8,
        }}
        src={network}
        alt="Pontos conectados um ao outro representando uma rede"
      ></img>
      <img
        style={{
          maxWidth: '100%',
          maxHeight: '200%',
          height: 'auto',
          maxopacity: 0.8,
        }}
        src={network}
        alt="Pontos conectados um ao outro representando uma rede"
      ></img>
      <div
        style={{
          color: 'white',
          position: 'absolute',
          top: '10%',
          left: '10%',
          right: '10%',
        }}
      >
        <div
          style={{
            fontSize: '5vh',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          Conectando Desafios
        </div>
        <div
          style={{
            fontSize: '5vh',
            fontWeight: 300,
            textAlign: 'center',
          }}
        >
          {t('siteDescription')}
        </div>
      </div>
    </div>
  );
};
export default Welcome;
