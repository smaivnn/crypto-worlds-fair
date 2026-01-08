import * as React from 'react';

import { Button, type buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>['size'];

interface IconTextButtonProps
    extends Omit<React.ComponentProps<typeof Button>, 'size' | 'variant' | 'children'> {
    left?: React.ReactNode;
    leftImageSrc?: string;
    leftImageAlt?: string;
    right?: React.ReactNode;
    rightImageSrc?: string;
    rightImageAlt?: string;
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    /**
     * true: Button의 고정 height를 해제하고(py-* 등) 내용에 맞게 높이 늘어날 수 있게 함
     * false: shadcn Button size의 고정 height를 유지
     */
    fitContent?: boolean;
    leftClassName?: string;
    centerClassName?: string;
    rightClassName?: string;
    imageClassName?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconTextButton = ({
    left,
    leftImageSrc,
    leftImageAlt = '',
    right,
    rightImageSrc,
    rightImageAlt = '',
    children,
    className,
    variant = 'default',
    size = 'default',
    fitContent = false,
    leftClassName,
    centerClassName,
    rightClassName,
    imageClassName,
    onClick,
    ...props
}: IconTextButtonProps) => {
    const leftContent =
        left ??
        (leftImageSrc ? (
            <img
                src={leftImageSrc}
                alt={leftImageAlt}
                className={cn('h-5 w-5 object-contain', imageClassName)}
            />
        ) : null);

    const rightContent =
        right ??
        (rightImageSrc ? (
            <img
                src={rightImageSrc}
                alt={rightImageAlt}
                className={cn('h-5 w-5 object-contain', imageClassName)}
            />
        ) : null);

    const minH =
        size === 'sm'
            ? 'min-h-9'
            : size === 'lg'
            ? 'min-h-11'
            : size === 'icon'
            ? 'min-h-10'
            : 'min-h-10';

    return (
        <Button
            variant={variant}
            size={size}
            className={cn(
                // 좌/우 슬롯을 고정 폭으로 두고 가운데 텍스트를 정확히 중앙 정렬
                // Tailwind arbitrary values use underscores for spaces (no commas)
                'w-full grid grid-cols-[2.25rem_1fr_2.25rem] items-center gap-3',
                fitContent && cn('h-auto', minH),
                className,
            )}
            {...props}
            onClick={onClick}
        >
            <span className={cn('flex items-center justify-start', leftClassName)}>
                {leftContent}
            </span>
            <span className={cn('min-w-0 truncate text-center', centerClassName)}>{children}</span>
            <span className={cn('flex items-center justify-end', rightClassName)}>
                {rightContent}
            </span>
        </Button>
    );
};

export default IconTextButton;
