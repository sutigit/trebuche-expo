import React, { ReactNode } from 'react';
import { TextStyle } from 'react-native';
import Markdown from 'react-native-markdown-display';

type MarkdownTextProps = {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    style?: TextStyle;
    children: ReactNode; // Accept markdown text as children
};

const sizeStyles = {
    sm: { fontSize: 12, lineHeight: 22 },  // was 18
    md: { fontSize: 14, lineHeight: 26 },  // was 22
    lg: { fontSize: 16, lineHeight: 30 },  // was 26
    xl: { fontSize: 18, lineHeight: 34 },  // was 28
};

const MarkdownText: React.FC<MarkdownTextProps> = ({ size = 'md', style = {}, children }) => {
    const { fontSize, lineHeight } = sizeStyles[size];

    const baseStyle: TextStyle = {
        fontSize,
        lineHeight,
        ...style, // inherit color, fontFamily, etc.
    };

    return (
        <Markdown
            style={{
                body: baseStyle,
                paragraph: baseStyle,
                text: baseStyle,
                strong: baseStyle,
                em: baseStyle,
                heading1: { ...baseStyle, fontSize: fontSize + 10, lineHeight: lineHeight + 4 },
                heading2: { ...baseStyle, fontSize: fontSize + 6, lineHeight: lineHeight + 2 },
                list_item: baseStyle,
            }}
        >
            {children}
        </Markdown>
    );
};

export default MarkdownText;
