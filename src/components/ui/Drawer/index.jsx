import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { FaX } from 'react-icons/fa6';
import styles from './drawer.module.scss';

/**
 * Drawer
 *
 * A bottom sheet. Base UI handles the focus trap, Escape, scroll locking and
 * swipe-to-dismiss, which the hand-rolled panels it replaced all lacked.
 *
 * `footer` renders outside the scrollable area so an action button stays put.
 */
const Drawer = ({
  open,
  onOpenChange,
  title,
  closeLabel = 'Close',
  children,
  footer,
  className,
}) => (
  <BaseDrawer.Root
    open={open}
    onOpenChange={onOpenChange}
    swipeDirection="down"
  >
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className={styles.backdrop} />
      <BaseDrawer.Viewport className={styles.viewport}>
        <BaseDrawer.Popup
          className={[styles.popup, className].filter(Boolean).join(' ')}
        >
          <span className={styles.grabber} aria-hidden="true" />

          <div className={styles.header}>
            <BaseDrawer.Title className={styles.title}>
              {title}
            </BaseDrawer.Title>
            <BaseDrawer.Close className={styles.close} aria-label={closeLabel}>
              <FaX />
            </BaseDrawer.Close>
          </div>

          <BaseDrawer.Content className={styles.content}>
            {children}
          </BaseDrawer.Content>

          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  </BaseDrawer.Root>
);

export default Drawer;
