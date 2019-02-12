** Has been abandoned for a while, will probably revisit as a more minimal library focused on HOC & compositing collection views **
React Collection Components
===========================
A set of modules containing React components that are focused on creating a uniform structure when rendering UI's that are structured as one dimensional Lists or Bars, or in two dimensions Grids or Flows. And to go with this backing structure various specific compositions of these things and other code to make them better suited for specific situations like dropdown menus, sidebars, header/footer bars, galleries, carousells, cards, etc. I came from a background of iOS software development before going into Full Stack development and enjoyed the structure of Apple's Cocoa Frameworks' [`UICollectionView`][01] and its subclasses like `UITableViewController`. For an idea of how these components get used in a React context which values a lot more composition than Object orientation, and a more declarative style, see how React Native handles [`SectionLists`][03]

Cells
-----
**Cells** are the most basic irreducible components of these collection components. For now they will be made specific to each kind of collection, but in the future it will be looked into whether making them general for all cases is a worthwhile modification.

In essence any **cell** despite any different kinds of rendering, are really just a single container componant which will in some manner be named `CellContainer`. And this `CellContainer` will only be a single parent `<div>` tag with `className="list-cell__container"` as its only property. Most of the work is then done by the stylesheet which will specify properties like `flex` properties that determine directionality, spacing and only a few other properties that provide the minimal styling required to have them appear the way their context would suggest they should. These stylesheets are written in [SASS][04] and eventually two style specifications will be created:

Lists
-----
**Lists** are any collection component that arranges a collection of **cells** vertically. Just as a cell this can be done by wrapping a set of JSX elements in a `ListCellContainer`, or rendered through a `data` source either heterogenously by providing a `renderer` function that simply has to return JSX elements based on the `data` provided as input. Homogenous rendering is determined if no `renderer` function is provided, but is still rendering from data by specifying the correct string representing the various `cellStyle`s available to be rendered. In this way the cell is rendered based on a programmed template, and either assumes *(TODO: in the future add the accessor keys that are looked for by default)* a key has been given to the data to render the **cell** or `accessor` props have been given that specify exactly at what part of the data to look into to render that parts of the `cellStyle`.

Testing
-------
Before increasing the main version number, every new component included is not only documented, but 

To-Do's
-------
- [ ] `ListCellContainer` component with onClick listener
- [ ] `ListCell` that renders *heterogenously* with props `data` & `renderer`
- [ ] `ListCell` that renders *heterogenously* with a specific `className` prop
- [ ] `ListCell` that renders *homogenously* with a default template of iOS style
- [ ] Integrate [Enzyme][100] to perform unit test and test `ListCellContainer`



References
----------
[01]: https://developer.apple.com/documentation/uikit/uicollectionview "Apple Docs: UICollectionView"
[02]: https://developer.apple.com/documentation/uikit/uitableview "Apple Docs: UITableView"
[03]: https://facebook.github.io/react-native/docs/sectionlist.html "React Native Docs: SectionList"
[04]: http://sass-lang.com/ "SASS Language: Main Page"

1. [Apple Docs: UICollectionView][01]
2. [Apple Docs: UITableView][02]
3. [React Native Docs: SectionList][03]
4. [SASS Language: Main Page][04]
