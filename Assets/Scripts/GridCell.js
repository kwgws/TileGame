#pragma strict

private var _tile : GameObject;
private var _bEmpty : boolean;

function Start() {
	_tile = null;
	_bEmpty = true;
}

function IsEmpty() : boolean {
	// This should work - there may be a better way though.
	// If we have a target tile then we're not technically empty.
	return _bEmpty;
}

function SetTile( newTile : GameObject ) {
	_tile = newTile;
	if( _tile != null ) {
		_bEmpty = false;
		newTile.transform.parent = transform;
		newTile.SendMessage( "SetLocalPosition", Vector3.forward * -1f );
	} else {
		_bEmpty = true;
	}
}

function GetTile() : GameObject {
	return _tile;
}
function SetTargetCell( newCell : GridCell ) {
	SetTile( newCell.GetTile() );
	newCell.SetTile( null );
}