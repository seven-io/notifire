import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  ParentProps,
  Setter,
  splitProps,
  useContext,
} from 'solid-js';
import { cn, useStyle } from '../../../helpers';
import type { AppearanceKey } from '../../../types';
import { useKeyboardNavigation } from './useKeyboardNavigation';

type TabsRootProps = Omit<JSX.IntrinsicElements['div'], 'onChange'> &
  ParentProps & {
    defaultValue?: string;
    value?: string;
    class?: string;
    appearanceKey?: AppearanceKey;
    onChange?: (value: string) => void;
  };

type TabsContextValue = {
  activeTab: Accessor<string>;
  setActiveTab: Setter<string>;
  visibleTabs: Accessor<string[]>;
  setVisibleTabs: Setter<string[]>;
};

const TabsContext = createContext<TabsContextValue>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within an TabsContext.Provider');
  }

  return context;
};

export const tabsRootVariants = () => 'nt-flex nt-flex-col';

export const TabsRoot = (props: TabsRootProps) => {
  const [local, rest] = splitProps(props, ['defaultValue', 'value', 'class', 'appearanceKey', 'onChange', 'children']);
  const [tabsContainer, setTabsContainer] = createSignal<HTMLDivElement | undefined>();
  const [visibleTabs, setVisibleTabs] = createSignal<Array<string>>([]);
  const [activeTab, setActiveTab] = createSignal(local.defaultValue ?? '');
  const style = useStyle();

  useKeyboardNavigation({ tabsContainer, activeTab, setActiveTab });

  createEffect(() => {
    if (local.value) {
      setActiveTab(local.value);
    }
  });

  createEffect(() => {
    local.onChange?.(activeTab());
  });

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, visibleTabs, setVisibleTabs }}>
      <div
        ref={setTabsContainer}
        class={style(local.appearanceKey || 'tabsRoot', cn(tabsRootVariants(), local.class))}
        {...rest}
      >
        {local.children}
      </div>
    </TabsContext.Provider>
  );
};
