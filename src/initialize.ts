import * as log from 'loglevel';
import * as prefix from 'loglevel-plugin-prefix';

const initialize = () => {
    console.info(`%c
88   88 8b    d8 88         .dP"Y8 888888 88   88 8888b.  88  dP"Yb  
88   88 88b  d88 88         'Ybo.    88   88   88  8I  Yb 88 dP   Yb 
88   88 88\\88/88 88  /8       'Y8b   88   Y8   8P  8I  dY 88 Yb   dP 
\\88888/ 88 88 88 888888     8bodP'   88   'YbodP' 8888Y"  88  YbodP
`, 'color: red;');

    log.noConflict();
    log.setLevel(log.levels.DEBUG);
    prefix.reg(log);
    prefix.apply(log, {
        template: '%c[%t] %c%l:%c',
        timestampFormatter: (date) => {
            return date.toISOString().match(/\d{2}:\d{2}:\d{2}.\d{3}/)[0];
        }
    });
    
    let originalLogDebug = log.debug;
    (log.debug as any) = (text: string) => {
        return originalLogDebug(text, 'color: #F08080;', 'color: #7FFF00;', 'color: #FFF;');
    }
    
    let originalInfoDebug = log.info;
    (log.info as any) = (text: string) => {
        return originalInfoDebug(text, 'color: #F08080;', 'color: #00BFFF;', 'color: #FFF;');
    }
    
    let originalErrorDebug = log.error;
    (log.error as any) = (text: string) => {
        return originalErrorDebug(text, 'color: #FF0000;', 'color: #FF0000;', 'color: #FF0000;');
    }
    
    let originalWarnDebug = log.warn;
    (log.warn as any) = (text: string) => {
        return originalWarnDebug(text, 'color: #FF0000;', 'color: #F0E68C;', 'color: #FFF;');
    }
}

export default initialize;