import CustomScrollBar from "@/components/CustomScrollBar/CustomScrollBar";
import "../assets/styles/main.scss";

export const metadata = {
  title: "Heats | UX/UI Consulting Agency | Research, Design and Test",
  description: "Heats | UX/UI Consulting Agency | Research, Design and Test",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <CustomScrollBar /> */}
      </body>
    </html>
  );
}
