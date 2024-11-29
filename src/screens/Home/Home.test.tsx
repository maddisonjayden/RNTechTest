import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/theme';

import Home from './Home';

describe('Home screen should render correctly', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  test('renders without crashing', () => {
    const storage = new MMKV();

    const component = (
      <SafeAreaProvider>
        <ThemeProvider storage={storage}>
          <QueryClientProvider client={queryClient}>
            <Home />
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    const { getByTestId } = render(component);

    // Check if Home component renders a specific part of its UI
    expect(getByTestId('home-screen')).toBeTruthy();
  });
});
