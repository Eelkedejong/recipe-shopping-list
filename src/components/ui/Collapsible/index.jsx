import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { FaChevronUp } from 'react-icons/fa';
import styles from './collapsible.module.scss';

/**
 * Collapsible
 *
 * A titled disclosure section. Base UI wires aria-expanded and aria-controls
 * onto the trigger, which the hand-rolled chevron buttons were missing: they
 * held nothing but an SVG, so they had no accessible name or state.
 *
 * The heading wraps the trigger (the WAI-ARIA disclosure pattern), so the
 * section is still reachable by heading navigation.
 */
const Collapsible = ({
  title,
  open,
  onOpenChange,
  defaultOpen,
  children,
  className,
}) => (
  <BaseCollapsible.Root
    open={open}
    onOpenChange={onOpenChange}
    defaultOpen={defaultOpen}
    className={['py-4 px-6 flex flex-col gap-2', className]
      .filter(Boolean)
      .join(' ')}
  >
    <h3 className="font-semibold mb-2">
      <BaseCollapsible.Trigger className={styles.trigger}>
        {title}
        <span className={styles.icon} aria-hidden="true">
          <FaChevronUp />
        </span>
      </BaseCollapsible.Trigger>
    </h3>

    <BaseCollapsible.Panel className={styles.panel}>
      <div className={styles.panelInner}>{children}</div>
    </BaseCollapsible.Panel>
  </BaseCollapsible.Root>
);

export default Collapsible;
