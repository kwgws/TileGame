#pragma strict

@script RequireComponent( TileBag )

private static var COLUMN_COUNT : int = 6;
private static var ROW_COUNT : int = 6;
private static var ROW_COUNT_TOTAL : int = ROW_COUNT + 1;
private static var CELL_WIDTH : float = 1f / COLUMN_COUNT;
private static var CELL_HEIGHT : float = 1f / ROW_COUNT_TOTAL;

private var _newTileRow : GridCell[];
private var _columns : GridColumn[];
private var _tileBag : TileBag;

var cellPrefab : GameObject;
var columnPrefab : GameObject;
var zOffset : float;
var tileSpacing : float;

function Awake() {
	// Initialize _newTileRow
	var newTileRowObj : GameObject = new GameObject();
	newTileRowObj.name = "NextTileRow";
	newTileRowObj.transform.parent = transform;
	newTileRowObj.transform.localPosition = Vector3.zero;
	newTileRowObj.transform.localScale = Vector3.one;
	
	_newTileRow = new GridCell[COLUMN_COUNT];
	for( var i : int = 0; i < COLUMN_COUNT; i++ ) {
		var newCell : GameObject = GameObject.Instantiate( cellPrefab );
		newCell.name = "Cell " + i;
		newCell.transform.parent = newTileRowObj.transform;
		newCell.transform.localPosition = GetCellLocalPosition( i, 6 );
		newCell.transform.localScale = 
			new Vector3( CELL_WIDTH - tileSpacing, CELL_HEIGHT - tileSpacing, 1f );
		_newTileRow[i] = newCell.GetComponent( GridCell );
	}
	
	// Initialize _columns
	_columns = new GridColumn[COLUMN_COUNT];
	for( var x : int = 0; x < COLUMN_COUNT; x++ ) {
		var newColumn : GameObject = GameObject.Instantiate( columnPrefab );
		newColumn.name = "Column " + x;
		newColumn.transform.parent = transform;
		newColumn.transform.localPosition = Vector3.zero;
		newColumn.transform.localScale = Vector3.one;
		_columns[x] = newColumn.GetComponent( GridColumn );
		
		var newCells : GameObject[] = new GameObject[ROW_COUNT];
		for( var y : int = 0; y < ROW_COUNT; y++ ) {
			newCell = GameObject.Instantiate( cellPrefab );
			newCell.name = "Cell " + y;
			newCell.transform.parent = newColumn.transform;
			newCell.transform.localPosition = GetCellLocalPosition( x, ROW_COUNT - 1f - y );
			newCell.transform.localScale =
				new Vector3( CELL_WIDTH - tileSpacing, CELL_HEIGHT - tileSpacing, 1f );
			newCells[y] = newCell;
		}
		_columns[x].Initialize( newCells );
	}
	
	_tileBag = GetComponent( TileBag );
}

function GetCellLocalPosition( x : float, y : float ) : Vector3 {
	var xP : float = ( x / COLUMN_COUNT ) + ( CELL_WIDTH / 2f ) - .5f;
	var yP : float = ( y / ROW_COUNT_TOTAL ) + ( CELL_HEIGHT / 2f ) - .5f;
	return new Vector3( xP, yP, -zOffset );
}

function Update() {
	// Fill the grid.
	for( var y : int = 0; y < COLUMN_COUNT; y++ ) {
		if( _newTileRow[y].IsEmpty() ) {
			var newTile : GameObject = GameObject.Instantiate( _tileBag.GetTile() );
			_newTileRow[y].SetTile( newTile );
			
			if( _columns[y].IsLookingForTile() ) {
				_columns[y].SetTopTile( newTile );
				_newTileRow[y].SetTile( null );
				_columns[y].Cascade();
			}
		}
	}
}
