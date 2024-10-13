import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'stormbreakerv1',
  description: 'Sandwich resistnant AMM that prevents atomic sandwich attacks on trades',
};

const links: { label: string; path: string }[] = [
  { label: 'Trade', path: '/account' },
  {
    label: 'Liquidity',
    path: '/clusters',
    subLinks: [
      { label: 'Pool', path: '/liquidity/pool' },
      { label: 'Portfolio', path: '/liquidity/portfolio' },
    ],},
  { label: 'Stake', path: '/stormbreakerv1' },
  { label: 'Explore', path: '/account' },
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Stormbreakerv1 Program', path: '/stormbreakerv1' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
