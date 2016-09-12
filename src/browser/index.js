import { render } from 'react-dom';

import root from 'universal/react/root';
import main from 'browser/serviceworker';

const component = root({name: 'world'});
render(component, document);

main();