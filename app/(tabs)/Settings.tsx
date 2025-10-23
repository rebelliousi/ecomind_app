import SettingsScreen from "@/screens/Settings";

export default function Page() {
  // Burada language ve changeLanguage propslarını context, hook veya parentdan alabilirsin.
  // Örneğin:
  // const { language, changeLanguage } = useLanguage();
  // return <SettingsScreen language={language} changeLanguage={changeLanguage} />;

  // Eğer propssuz kullanıyorsan (dummy):
  return <SettingsScreen language="en" changeLanguage={() => {}} />;
}