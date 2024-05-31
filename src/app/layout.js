import './globals.css';
import { AppWrapper } from './context';

export const metadata = {
  title: 'Sql Playground',
  description: 'RUN SQL QUERIES',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
