---
title: js-design-pattern
date: 2016-06-04 14:45:32
tags:
---


## 单例模式
```javascript
    var singleton = function( fn ){
        var result;
        return function(){
            return result || ( result = fn.apply( this, arguments ) );
        }
    }
    var createMask = singleton( function(){
        return document.body.appendChild( document.createElement('div') );
    })
```
```javascript
    var Singleton = function(){
        var instantce
        var init = function(){
            return {}
        }
    
        return {
            getInstance: function(){
                if(!instantce){
                    instantce = init()
                    return instantce
                }
                return instantce
            }
        }
    }
```

## 构造函数模式
```javascript
    function Batman(vehicle, opponent, helper){
    	this.vehicle = vehicle
    	this.opponent = opponent
    	this.helper = helper
    }
    
    Batman.prototype.doSomething = function(){
    	var result = this.helper +' is driving '+ this.vehicle + ' fighting against '+ this.opponent
    	console.log(result)
    	return result
    }
    
    var robin = new Batman('the bat', 'Joker', 'Robin')
    robin.doSomething()
    var catwoman = new Batman('bat mobile', 'Poison Ivy', 'Cat Woman')
    
    catwoman.doSomething()
```

## 建造者模式
```
    函数抽离
```

## 工厂模式
```javascript
      var batman = {}
      
      batman.fight = function(){
        return 'batman fight'
      }
    
      batman.eat = function(){
        return 'batman eat'
      }
    
      batman.sleep = function(){
        return 'batman sleep'
      }
      batman.factory = function(type){
        return batman[type]
      }
    
      var fight = batman.factory('fight')
      
      fight()
```