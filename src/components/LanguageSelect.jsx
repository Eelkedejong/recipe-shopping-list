import { useTranslation } from "react-i18next"

const LanguageSelect = () => {
  const { t, i18n } = useTranslation()

  const lngs = {
    en: { nativeName: 'English' },
    nl: { nativeName: 'Nederlands' }
  }

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <button 
          type="submit"
          key={lng}
          onClick={() => {
            i18n.changeLanguage(lng)
          }}
          disabled={i18n.resolvedLanguage === lng}
        >
          {lngs[lng].nativeName} 
        </button>
      ))}
    </>
  )
}

export default LanguageSelect