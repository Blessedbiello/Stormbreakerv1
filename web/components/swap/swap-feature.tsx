'use client';

import { useState } from 'react';
import { AppHero } from '../ui/ui-layout'; // Assuming you have this layout component
import { SwapUiForm } from './swap-ui';

export default function SwapFeature() {
  return (
    <div>
      <AppHero title="Swap" subtitle="Swap your tokens on Solana">
        <SwapUiForm />
      </AppHero>
    </div>
  );
}
