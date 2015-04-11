#pragma strict

private static var ROW_COUNT : int = 6;

private var _cells : GridCell[];
private var _initialized : boolean;

function Start() {
	_initialized = false;
}

function Initialize( newCells : GameObject[] ) {
	if( !_initialized ) {
		// Make sure everything's in order first...
		if( newCells.Length != ROW_COUNT ) {
			Debug.LogError( gameObject.name + " has been given the wrong "
							+ "number of rows during initialization!" );
			return;
		}
		
		// Get a copy of each cell's data.
		_cells = new GridCell[ROW_COUNT];
		for( var i : int = 0; i < ROW_COUNT; i++ ) {
			_cells[i] = newCells[i].GetComponent( GridCell );
		}
		
		_initialized = true;
		Debug.Log( gameObject.name + " initialized." );
		return;
	}
	
	// We can only do this once!
	Debug.LogError( gameObject.name + " is already initialized!" );
}

function IsEmpty() : boolean {
	return GetEmptyRowCount() == ROW_COUNT;
}

function IsLookingForTile() : boolean {
	return _cells[0].IsEmpty();
}

function SetTopTile( newTile : GameObject ) {
	_cells[0].SetTile( newTile );
}

function GetEmptyRowCount() : int {
	var count : int = 0;
	for( var i : int = 0; i < ROW_COUNT; i++ ) {
		if( _cells[i].IsEmpty() ) {
			count += 1;
		}
	}
	return count;
}

function Cascade() {

	// If there's nothing to cascade, don't bother.
	if( !IsEmpty() ) {
	
		// Start at the back of the column and move up. Do not check
		// the grid space in front - if this is empty, we need the game
		// to generate a new tile for us.
		for( var i : int = ROW_COUNT - 1; i >= 1; i-- ) {
			if( _cells[i].IsEmpty() ) {
				for( var x : int = i; x >= 0; x-- ) {
					if( !_cells[x].IsEmpty() ) {
						_cells[i].SetTargetCell( _cells[x] );
						break;
					}
				}
			}
		}
	}
}
