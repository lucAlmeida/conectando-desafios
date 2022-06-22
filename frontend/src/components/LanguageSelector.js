import { useTranslation } from 'react-i18next';

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  return (
    <>
      <img
        src="https://flagcdn.com/24x18/br.png"
        title="Brazilian Portuguese"
        onClick={() => i18n.changeLanguage('ptBR')}
        alt="Bandeira Brasileira"
      />
      <img
        src="https://flagcdn.com/24x18/us.png"
        title="English"
        onClick={() => i18n.changeLanguage('en')}
        alt="United States Flag"
      />
    </>
  );
};

export default LanguageSelector;
