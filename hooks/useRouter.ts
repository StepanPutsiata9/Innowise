import { useRouter as useExpoRouter } from 'expo-router';

type AppRoutes = {
  "index": undefined;
  "characterInfo": undefined;
  "settings": undefined;
};
type RouteName = keyof AppRoutes;

export function useTypedRouter() {
  const nativeRouter = useExpoRouter();

  return {
    ...nativeRouter,
    push: <T extends RouteName>(route: T, params?: AppRoutes[T]) => {
      nativeRouter.push({ pathname: route, params } as never);
    },
    replace: <T extends RouteName>(route: T, params?: AppRoutes[T]) => {
      nativeRouter.replace({ pathname: route, params } as never);
    },
    navigate: <T extends RouteName>(route: T, params?: AppRoutes[T]) => {
      nativeRouter.navigate({ pathname: route, params } as never);
    },
  };
}