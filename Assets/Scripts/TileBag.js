#pragma strict

var TilePrefabs : GameObject[];

function GetTile() : GameObject {
	return TilePrefabs[Random.Range( 0, TilePrefabs.Length )];
}