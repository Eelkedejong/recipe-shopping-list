import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { FaX } from 'react-icons/fa6';

/**
 * Dialog
 *
 * A centred modal. Base UI handles the focus trap, Escape, scroll locking and
 * returning focus to whatever opened it.
 *
 * `footer` renders outside the scrollable area so the actions stay put when
 * the body is long.
 */
const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  closeLabel = 'Close',
  children,
  footer,
  className,
}) => (
  <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-[100] bg-black/40" />
      <BaseDialog.Popup
        className={[
          'rounded-20 fixed top-1/2 left-1/2 z-[101] flex max-h-[85vh] w-[min(32rem,calc(100vw-2rem))]',
          '-translate-x-1/2 -translate-y-1/2 flex-col bg-white shadow-xl',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-2">
          <div>
            <BaseDialog.Title className="text-20 font-semibold">
              {title}
            </BaseDialog.Title>
            {description ? (
              <BaseDialog.Description className="text-14 text-dark-grey mt-1">
                {description}
              </BaseDialog.Description>
            ) : null}
          </div>
          <BaseDialog.Close
            aria-label={closeLabel}
            className="text-dark-grey shrink-0 p-1 hover:text-black"
          >
            <FaX />
          </BaseDialog.Close>
        </div>

        {/* min-h-0 is load-bearing: without it this flex child refuses to
            shrink below its content, so the body overflows the popup and
            the footer ends up covering it. */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {footer ? (
          <div className="border-light-grey flex shrink-0 justify-end gap-3 border-t bg-white px-6 pt-4 pb-6">
            {footer}
          </div>
        ) : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  </BaseDialog.Root>
);

export default Dialog;
