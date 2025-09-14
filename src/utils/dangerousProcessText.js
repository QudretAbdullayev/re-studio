export const dangerousProcessText = (text) => {
    if (!text) return '';
    let processedText = text;

    processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    processedText = processedText.replace(/\\r\\n/g, '<br>');

    processedText = processedText.replace(/\r\n/g, '<br>');

    processedText = processedText.replace(/\n/g, '<br>');

    processedText = processedText.replace(/\r/g, '<br>');

    if (!processedText.includes('<br>')) {
        processedText = processedText.replace(/\s{2,}/g, '<br>');
    }

    return processedText;
};